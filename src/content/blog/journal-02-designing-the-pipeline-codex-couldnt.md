---
title: "Journal 02: Designing the Pipeline Codex Couldn’t"
description: "A caching failure revealed that a working AWS deployment was not a release system—and led to a versioned pipeline with simple promotion and rollback."
pubDate: 2026-08-06
heroImage: "/blog/journal-02-designing-the-pipeline-codex-couldnt.jpg"
tags: ["allies", "codex", "aws", "devops", "software-development"]
type: "journal"
journalNumber: 2
draft: false
---

I wanted Codex to create the DevOps for Allies on AWS.

The application had two parts to deploy: a Kotlin/Wasm site hosted directly in S3 and a backend running as Lambda functions. Codex created a script for both, I ran it, and the application went live.

That was pretty much what I had asked for. I had a deploy script. I was deploying. I assumed Codex had worked through the normal release concerns along the way.

It was not until my second release that I realized the deployment was broken.

I pushed the new version, opened the application, and did not see my changes. I had enough experience with releases to recognize the symptom. This looked like caching.

What bothered me was that I had assumed Codex would have designed the caching correctly. It had been able to create all of the AWS resources and scripts. Handling a new release seemed like it should have been part of that work.

Once I looked more closely, the problem was not difficult to explain.

The WASM site starts with `index.html`. That loads `composeApp.js`, which then loads hashed WASM files.

```text
index.html → composeApp.js → hashed WASM files
```

The hashed files were fine. Their names change with each release, so browsers can cache them without hiding a newer version. Codex had also made `index.html` non-cacheable.

It had left `composeApp.js` cached.

That file sits in the middle of the whole chain. Its name stays the same, but its contents change to point at the files for the current build. The browser could receive the new `index.html`, see the same `composeApp.js`, and keep running the previous release.

I had to point out that `composeApp.js` was the problem. Codex did not work backward from the failed release and find it for me.

Once I did, Codex started proposing a more involved solution using CloudFront and day-based caching. It was doing things and making suggestions, but none of them felt like they were getting to the center of the problem. A day-long cache still meant a user could have the wrong release for a day. Disabling the cache was simpler, but `composeApp.js` was around 500 KB. That is about the size of a web-compressed JPEG. It seemed wasteful to download it again and again when most visits did not need a new version.

I kept asking Codex to fix the caching rules. Eventually I realized I was asking the wrong question.

## The deployment had no way back

The caching problem made me look at what else happened during a release. That was when I noticed there was no rollback.

If the new release had a serious bug, I would have to check out the old code, rebuild it, and deploy it again. Codex treated that as the way to get the old version back.

I do not consider that a rollback.

We have all tried to rebuild old code and discovered some new reason it no longer builds. A dependency has changed. A tool has moved. Something about the environment is different. Even if the build works, it is still another deployment being performed while everyone is already trying to understand why production is down.

The release that had been running successfully should already exist somewhere. Rolling back should mean selecting that known version again, not attempting to recreate it under pressure.

I think how well a system rolls back is a good reference for how good its deployment really is. Every production system eventually gets a bug that was only discovered in production. That is not the exceptional case the deployment can ignore. It is one of the situations the deployment is for.

At first, I was thinking about something close to the behavior I had used with ECS. The Docker image for the old release remained available. If I needed it again, ECS could start another instance from that image. I was hoping Lambda had an equivalent that Codex could show me.

Codex pointed me toward some strange workarounds, but it kept coming back to another deploy. It also kept assuming that there needed to be one API URL.

The more we worked inside those assumptions, the more complicated the answers became.

## The directory was the design

The first breakthrough was realizing that the S3 directory structure could solve more than the caching issue.

Instead of replacing all of the web files on each release, I could put every release in its own directory:

```text
/1.2.2/
/1.2.3/
```

The root `index.html` could stay where it was and point into the directory for the current version. A new release would create a new location instead of changing the files in an old one.

That made the caching rules much easier to reason about. Everything inside `/1.2.3/` belonged to version `1.2.3` and would never change. `composeApp.js` could be cached because the next release would have a different URL: `/1.2.4/composeApp.js`. The only mutable file was the root `index.html`, which was already non-cacheable and was less than 1 KB.

The directory also kept the old release intact. I could open the `index.html` inside a new version directory before making it public. Both versions could run side by side. Moving production back to an old client no longer required a build.

Once I described this structure, Codex had no trouble creating the HTML and JavaScript needed to make it work. It could implement the idea easily. It just had not been able to find the idea from the caching problem.

At that point, the client side was close to the release process I wanted. The Lambda side was still tied to one deployment and one API.

I eventually questioned why there had to be one API URL at all.

If every client release had its own directory, every backend release could have its own CloudFormation/SAM deployment. Lambda already gave me a way to run APIs without keeping duplicate servers alive. Keeping the old API available did not have to mean maintaining a second fleet of machines.

This was another point where Codex could build what I described but did not arrive at the design on its own. I told it that I wanted multiple CloudFormation/SAM deployments. Once I did, it was able to wire up most of the pieces, and I relied on it to make the design work.

For version `1.2.3`, the deploy script creates a stack named:

```text
prod-allies-1-2-3-lambda
```

That stack creates a new API Gateway with its own AWS-generated hostname. The semantic version does not need to appear in the API path. The `/Prod` segment in the URL is the API Gateway stage, not the Allies version.

Codex used a small `release.json` file to connect the two sides. After CloudFormation creates the stack, the deploy script reads its `AlliesApiUrl` output and writes that URL into `/1.2.3/release.json`. When the web application in `/1.2.3/` starts, it reads the `release.json` beside it and sends requests to that release's API.

```text
/1.2.2/index.html → /1.2.2/release.json → API Gateway A
/1.2.3/index.html → /1.2.3/release.json → API Gateway B
```

The application also sends `X-Allies-Version: 1.2.3` with its requests. That is useful for debugging and traceability, but it is not how requests are routed. Each release is isolated because it has its own Gateway and Lambda stack.

I had supplied the direction, but I had not specified every connection. Codex figured out much of this mechanism. The process was not me designing every detail and then asking Codex to type it. It was me finding the shape that Codex could not see, then relying on Codex to make that shape work.

## One line to move production

The final promotion process is almost nothing.

The root `index.html` contains a base path:

```html
<base href="/1.2.3/">
```

I have a script that accepts a version and updates that line. It is something I could do manually, but the script makes it even easier.

That one change selects the client directory. The client directory contains the `release.json` that selects the matching API. Promoting version `1.2.3` means changing the base path to `/1.2.3/`. Rolling back means running the same script with the previous version.

There is no rebuild. The old client and old API are already running. There is no separate backend switch because the selected client already knows which backend belongs to it.

This was the simplicity I kept trying to get Codex to understand.

Even after I gave it the design, Codex kept expressing concerns about old deployments and data that would eventually need to be cleaned up. Cleanup is a real responsibility, and I was concerned about the cost of leaving old releases in place. But Codex itself explained that there would be almost no ongoing cost beyond S3 storage, then continued suggesting that the approach was not a good idea.

It was counting the number of resources without comparing the operational tradeoffs. One deployment and one URL looked simpler on an architecture diagram. But that version required rebuilds during rollback, made side-by-side releases difficult, and forced every client toward the current backend.

Multiple versioned deployments created more AWS objects. They made the act of releasing and recovering much simpler.

## A few releases later

We have now used this deployment model for several releases, and I could not be happier with it.

It also solved a release problem that was larger than the original WASM cache. The web version can be released immediately. Android might follow a week later, and iOS a week after that. People can continue using an older client because its API is still there. We do not have to force an update just to keep the client and backend compatible.

What started as a missing cache rule ended with a release model for the whole application.

The experience changed how I think about asking Codex to build infrastructure. Codex can create a deployment that works. It can also keep modifying that deployment as individual problems appear. Neither means it has found the right release design.

I needed to recognize that caching, rollback, side-by-side releases, and mobile compatibility were not separate fixes. They were all telling me that a release needed to be a complete, retained, versioned unit.

Once I supplied that idea, Codex was able to do a large part of the difficult work required to make it real. But until I changed the design, it kept making the wrong deployment more complicated.

Codex could build the pipeline. I had to help it see which pipeline to build.
