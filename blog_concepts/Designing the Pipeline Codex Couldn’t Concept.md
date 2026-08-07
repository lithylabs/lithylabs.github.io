# Designing the Pipeline Codex Couldn’t

## Current understanding

I initially approached the DevOps for Allies as something Codex could create from the desired outcome. Codex wrote a script, and I was able to deploy to AWS. That visible success made it seem as though the DevOps problem had been solved.

The original deployment has two main parts: deploying the WASM web application directly to S3 and deploying the Lambda functions. It did not use CloudFront. The first failure appeared in the WASM deployment. `index.html` points to `composeApp.js`, which in turn points to hashed WASM files. The hashed files naturally avoid stale-release problems because their names change with each release. Codex correctly made `index.html` non-cacheable but left `composeApp.js` cached, even though it is the link between the stable HTML entrypoint and the release-specific WASM assets.

I discovered the mistake on the second release, when the deployed application did not show my changes. Previous release experience made me recognize the symptom as a caching problem, but I had assumed Codex would have designed this part correctly. I had to identify `composeApp.js` as the actual problem before Codex addressed it.

Codex then suggested a more elaborate CloudFront process involving day-based caching. That response introduced another tradeoff rather than cleanly resolving the design. Making `composeApp.js` download frequently would avoid stale releases, but the file is roughly 500 KB, while `index.html` is under 1 KB. A 500 KB transfer is comparable to a web-compressed JPEG, so preserving the ability to cache it would be worthwhile. This exposed a tension the deployment design needed to solve: release correctness without making every visit redownload a large JavaScript file.

The caching failure was not the only missing piece. The generated deployment had no real rollback. Recovering an old release meant checking out old code, rebuilding it, and deploying it again. That is a redeployment, not a rollback. Rebuilding introduces fresh opportunities for dependencies, tools, configuration, or the build itself to fail at exactly the moment the production system is already in crisis.

A good deployment can be judged by how safely and quickly it responds to the inevitable production-only bug. The previous production release should remain stored on the servers so recovery can be a simple replacement of the new version with the known artifact. Better still, a blue/green deployment should allow the old and new versions to run side by side, make the new version available for verification, and then switch production traffic to it. Ideally, people already running the old client should continue talking to the matching old API while the new client uses the new API.

Lambda made concurrent API versions seem achievable without duplicating conventional servers. This became the direction for the design: find a simple way to preserve and run complete versions of both the WASM client and Lambda API, then make activation a controlled switch rather than a rebuild and redeploy.

The client-side breakthrough was a directory structure. The root `index.html` remains the small, mutable pointer to production, while every release places its complete WASM application in a version-specific directory. Files within that directory can be cached because a new release gets a new location rather than overwriting the old one. Codex could readily implement the required HTML, JavaScript, and deployment scripts after I supplied this structure; it had not arrived at the directory structure itself.

The versioned directories also solved more than caching. Each release's own `index.html` could be opened directly before the root production pointer changed. This made it possible to run and verify the new WASM release alongside the current version, and it preserved the previous client for immediate rollback.

The backend needed the same release model. My prior experience with ECS shaped the expectation: ECS retained the Docker image, so rollback could start a new instance from a known artifact. I looked for the Lambda equivalent, while Codex proposed awkward workarounds and remained focused on one API URL. The simpler answer was multiple isolated APIs backed by separate CloudFormation/SAM deployments. The semantic version is not part of the API path. Each stack creates a new API Gateway with its own AWS-generated hostname, and the deploy script records that URL in the client release's `release.json`.

I supplied the architectural move toward multiple deployments, but Codex wired together most of the mechanism and I relied on it to make the design work. This is an important qualification to the working title: Codex did not independently find the organizing design, but it contributed substantial design detail and implementation once the direction was established.

Codex continued to resist the design after it was specified. It emphasized cleanup of accumulated deployment data and resources, but did not meaningfully compare that maintenance cost against the operational risk of rebuilding and redeploying during rollback. It also acknowledged that retained releases would incur little ongoing cost beyond S3 storage, yet continued suggesting that the approach was undesirable.

Several real releases have now validated the design. It supports the naturally staggered release schedule of multiple clients: WASM can go live immediately, Android a week later, and iOS another week after that. Older clients do not need to be forced to update because their matching APIs can remain deployed for almost no ongoing cost. What began as a caching repair became a versioned release model across web, mobile, and backend.

Discovering that failure exposed a deeper problem: Codex could produce working-looking infrastructure without having a coherent design for the system. When I pointed out the problem, Codex kept taking actions and offering suggestions, but those responses did not move the system toward the solution I needed.

The turning point was realizing that I needed to provide the design. Once I supplied it, Codex treated the solution as if it were obvious and was able to implement the scripts. Implementation still required active judgment from me because Codex repeatedly pushed toward more complexity, and I repeatedly had to ask it to simplify.

The emerging distinction is between implementation and design. Codex was effective at translating an explicit design into infrastructure, but its ability to generate scripts and produce a deployment was not evidence that the underlying system was sound. The final solution reflects both the architecture I had to supply and the complexity I chose to remove.

This journal entry should describe that journey honestly and then explain the final solution: what each part does, which problems it solves, and why the resulting system is simpler than the alternatives Codex kept proposing.

## Evolution

### 2026-08-06

- I began with the broad idea of writing about using Codex to create the DevOps for Allies on AWS.
- Codex created a script and produced a deployment, which initially looked like success.
- I discovered that caching was configured incorrectly and the deployed system was broken.
- Pointing out the failure led Codex to do more work and make suggestions, but the suggestions were not useful.
- I eventually realized that the missing input was not another correction or prompt; it was a design.
- After receiving the design, Codex could implement the scripts and behaved as though the solution had been obvious.
- Even with the design, I had to keep directing Codex toward simplicity because it repeatedly wanted to add complexity.
- I chose **Designing the Pipeline Codex Couldn’t** as the working title for Journal 02. The title centers the difference between Codex building pipeline machinery and providing the design judgment the pipeline required.
- The original deployment consisted of a WASM application hosted directly from S3 and Lambda functions. It did not use CloudFront. The first concrete failure was in the caching strategy for the WASM application.
- `index.html` referenced `composeApp.js`, and `composeApp.js` referenced release-specific hashed WASM files. Codex disabled caching for the HTML but left the stable-named JavaScript entrypoint cached.
- I discovered the failure on the second release when my changes did not appear. I recognized the symptom from previous release experience but had assumed Codex would already have handled it.
- I had to identify `composeApp.js` as the problematic cached layer myself.
- Codex responded with a more convoluted CloudFront design involving day-based caching, but frequent revalidation or downloading of the roughly 500 KB JavaScript file would discard useful caching. By comparison, `index.html` was under 1 KB.
- The design problem became more precise: how to make new releases appear reliably while retaining effective caching for a comparatively large JavaScript asset.
- The original Codex deployment had no genuine rollback. Returning to an earlier version required rebuilding and redeploying old source code.
- I rejected calling that a rollback because it depends on a fresh build succeeding during a production incident. Builds can fail later for reasons unrelated to the old source code.
- I began treating rollback quality as a useful measure of deployment quality: production-only defects are inevitable, so recovery should already be designed into the release system.
- At minimum, the known previous artifacts should remain on the servers and be restorable through a copy-and-replace operation.
- The stronger goal was blue/green deployment: run the new and old versions side by side, verify the new version, and switch which one receives production traffic.
- The ideal went further: an existing user running the old client should still be able to use the corresponding old API while new clients use the new API.
- Because the backend used Lambda, I believed both API versions could run concurrently without maintaining duplicate server infrastructure. The remaining challenge was finding a simple design that connected versioned clients to versioned APIs.
- The client-side solution was to keep a small `index.html` at the root and place every complete WASM release in its own versioned directory. A new release changes the directory rather than overwriting cacheable assets in the existing location.
- Codex could easily write the HTML, JavaScript, and deployment logic after being given that design. What it had failed to supply was the directory structure itself.
- Each versioned directory also has an `index.html`, allowing a new release to run at its own location for prerelease verification while the current production version remains active.
- My expectations for Lambda rollback came from ECS, where the previously deployed Docker image remained available and could be started again without rebuilding it.
- Codex remained constrained by the assumption of a single API URL. Multiple API URLs made rollback and side-by-side execution part of the same design.
- The application was changed to know its release version and generate its API URL from that version. Each Lambda version is deployed through a separate CloudFormation/SAM deployment with a specified URL base.
- Once told to create multiple deployments, Codex implemented them without difficulty. It had not proposed the multiple-deployment model itself.
- Codex wired together most of the final mechanism, and I relied on it to make the design work. The story is not that Codex contributed no design or judgment; it needed the central architectural constraint to be reframed first.
- For version `1.2.3`, the stack is named `prod-allies-1-2-3-lambda`, the browser application lives under `/1.2.3/index.html`, and the new stack produces a unique API Gateway hostname.
- The deploy script reads the stack's `AlliesApiUrl` CloudFormation output and writes it to `/1.2.3/release.json` beside the client.
- The client reads its adjacent `release.json` when it loads, then sends all requests to that release's API Gateway.
- Promotion and rollback replace only the root `index.html`. Its `<base href="/1.2.3/">` selects the immutable client directory, whose `release.json` automatically selects the matching API.
- Requests also carry `X-Allies-Version: 1.2.3` for debugging and traceability. This header does not perform routing; isolation comes from separate Gateway/Lambda stacks.
- `/Prod` in the API URL is the API Gateway stage, not the semantic application version. The semantic version is represented in the stack name, S3 directory, release metadata, and diagnostic request header.
- Promotion is a script that accepts the desired version and updates the root `index.html` `<base href>`. No other client or API routing change is required.
- The switch is simple enough to perform manually; the script exists for convenience and reliability.
- Promotion and rollback are the same operation pointed at different versions.
- The details of prerelease testing are outside this journal entry's scope. The ability to run a release side by side matters; the test procedure itself does not need to be explained.
- The first separate journal draft was created as `Designing the Pipeline Codex Couldn’t.md`.
- The draft's boundary begins with the apparently successful first deployment and ends after several real releases have validated the versioned model. Detailed prerelease testing and retention-policy design remain outside its scope.
- The draft preserves the collaboration nuance: I supplied the organizing architecture, while Codex designed and wired together much of the mechanism after the direction was established.
- Truth review corrected the original infrastructure: the first release hosted the WASM application straight from S3, without CloudFront. CloudFront appeared only in a later solution proposed by Codex.
- The first draft felt too much like a presentation of facts and not enough like my experience of working through the problem. The next draft should let the architecture emerge through my assumptions, surprise, frustration, and eventual reframing.
- Codex objected that retained releases and their data would require cleanup. It did not adequately compare that cost with the risks and operational burden of rebuilding old code during an incident.
- I worried about the ongoing cost of old releases. Codex explained that little real cost would accrue beyond S3 storage, but still repeatedly advised against the design.
- After several releases, I am very happy with the resulting model.
- The architecture supports staggered platform releases: WASM can release immediately, Android a week later, and iOS a week after that, while every client version continues using its matching API.
- Users do not need to be forced to update because older versions can remain available at almost zero cost.

## Source material

### Initial account

The goal was to have Codex create the DevOps for Allies on AWS. It created a script, and deployment was working. I later realized the result was broken because caching had not been configured correctly.

After I pointed out the caching issue, Codex continued taking actions and making suggestions that were not helpful. The process only began to converge when I realized that I needed to provide the design myself. Given that design, Codex implemented the scripts and responded as though the solution were obvious.

During implementation, Codex repeatedly wanted a more complex solution. I had to keep asking it to simplify. I now have a solution I am satisfied with and want the journal entry to explain its behavior and how it addresses a concrete list of problems.

### The second release

The application deployment has two parts:

- WASM application assets deployed to S3
- Lambda functions

The WASM application's loading chain was:

```text
index.html → composeApp.js → hashed WASM files
```

The hashed WASM filenames change on every release, so those files can be cached without causing an old release to remain active. `index.html` is under 1 KB and was configured with no caching. The mistake was that `composeApp.js`, whose stable name points toward the current hashed assets, remained cached.

The first deployment appeared successful. On the second release, the application did not reflect the new changes. I recognized the symptom as caching-related because of previous deployment experience, though I had expected Codex to account for this in its original design. Codex did not identify the critical role of `composeApp.js` until I explicitly pointed it out.

Its next suggestion involved a more elaborate CloudFront process with day-based caching. That raised a bandwidth and performance concern: `composeApp.js` is roughly 500 KB, about the size of a compressed web JPEG. It would be valuable to avoid downloading it unnecessarily. The desired design therefore cannot merely disable useful caching everywhere; it must combine reliable release updates with long-lived caching where the content permits it.

### Rollback is not rebuilding

The generated deployment did not preserve a directly restorable release. To return to an older version, I would have needed to retrieve the old source, rebuild it, and deploy the result. I do not consider this a rollback. A build that worked previously may fail later because its dependencies, tools, environment, or configuration have changed. Those risks become especially harmful when the current production release is already broken and the team is responding under pressure.

Production-only bugs are inevitable. How well a deployment handles one is a strong reference point for the quality of the deployment itself.

The minimum useful rollback would retain the old production artifacts on the servers. Restoring them should be closer to copying the old version over the new one than recreating the release from source.

The preferred model is blue/green deployment:

1. Preserve the currently running version.
2. Deploy the new client and API alongside it.
3. Verify the new version while the old version remains available.
4. Swap production to the new version.
5. Ideally, allow clients already using the old version to continue communicating with the old API.

Lambda suggested a path to running both API versions simultaneously without maintaining duplicate server infrastructure. The unresolved design question was how to connect each version of the WASM client to its corresponding API while keeping the release and rollback mechanism simple.

### Version the location

The client-side design used directories to turn each release into a stable location:

```text
root index.html → version directory → composeApp.js → hashed WASM files
```

The small root `index.html` acts as the mutable production pointer. Each deployment uploads all of the new release's files into a new directory instead of overwriting the previous release in place. Because an old location never changes, its larger assets can remain cached. Publishing a release means changing the root entrypoint to select the new directory.

The directory also contains an `index.html` that can launch that specific version directly. This allows the new client to be tested in its deployed environment before it becomes the public default. Old and new WASM clients can run side by side, and selecting the previous version again does not require rebuilding it.

Codex was able to create the HTML, JavaScript, and deployment scripting once given this structure. The missing contribution was the structure itself.

### Give every release its own API

My previous rollback model came from ECS. The old Docker image remained available, so a rollback could start an instance of an artifact that had already been built. I expected Lambda to offer an analogous capability. Codex suggested workarounds, but its proposals remained centered on preserving a single API URL and ultimately redeploying.

The design changed when I stopped treating the single URL as a constraint. Each release could have:

- Its own client directory
- Its own release identifier
- Its own API URL derived from that identifier
- Its own CloudFormation/SAM deployment of the Lambda functions

The application does not derive the API hostname from the semantic version. Each CloudFormation/SAM deployment creates a separate API Gateway with a unique AWS-generated hostname. The deployment script reads the `AlliesApiUrl` output from that stack and writes the concrete URL into `release.json` beside the corresponding web client.

For release `1.2.3`, the relationship is:

```text
CloudFormation stack: prod-allies-1-2-3-lambda
                       │
                       └─ output: AlliesApiUrl
                                      │
/1.2.3/index.html → /1.2.3/release.json → unique API Gateway /Prod/allies
```

When the versioned web application loads, it reads its adjacent `release.json`, then directs every API request to the recorded Gateway URL. A request also includes `X-Allies-Version: 1.2.3`, but only for debugging and traceability. It is not involved in routing.

The `/Prod` segment is the API Gateway stage rather than the application version. The semantic version instead appears in the CloudFormation stack name, S3 directory, release metadata, and request header. Actual isolation comes from separate Gateway and Lambda stacks.

Promotion and rollback only replace the root `index.html`. Its `<base href="/1.2.3/">` selects an immutable version directory. Assets and `release.json` then load relative to that directory, so selecting the client also selects its matching backend without a separate routing change.

In practice, promotion is a script that accepts a semantic version and updates the `<base href>` in the root `index.html`. That is the entire switch. It could be performed manually, but the script makes the operation faster and less error-prone. Rollback is structurally the same operation: run the switch with the previous version.

Codex wired up most of these pieces, and I relied on it to turn the architectural direction into a working design. It did not discover the multiple-deployment model on its own, but its contribution after that realization was more substantial than simply transcribing a fully specified solution.

### The tradeoff Codex would not make

Codex continued to raise concerns about cleanup after the solution was provided. Retaining releases means that old deployment resources and data eventually need to be removed. But the alternative also has a cost: rebuilding and redeploying old source during a production incident, losing side-by-side verification, and forcing old clients to move in lockstep with the newest API.

Cost was a legitimate concern. According to Codex's own analysis during the work, idle old releases would add little ongoing expense beyond their S3 storage, yet it continued to discourage the design rather than compare the two approaches as explicit tradeoffs.

The versioned release model has now been used successfully for several releases. It also fits mobile distribution better than the original design could. The web client can update immediately, followed by Android and iOS on their slower schedules. Older installed clients can keep using their corresponding APIs, so users do not have to be forced onto the newest release.

### Emerging phrases

- A deployment is not evidence that the system is sound.
- Rebuilding and redeploying old code is not a rollback.
- How well you can roll back is a good reference for how good your deployment is.
- The old version should already be on the servers when the new version fails.
- Version the location instead of fighting the cache.
- The release version connects the client directory, the API URL, and the Lambda deployment.
- Multiple URLs were not extra complexity; they removed the single-URL constraint that made rollback difficult.
- Codex could implement the design once given it, but could not discover the design from the failures.
- I provided the organizing idea; Codex worked out and connected much of the mechanism.
- Selecting the client release also selects the API release.
- `X-Allies-Version` explains a request; it does not route it.
- A release switch is just a change to the root `<base href>`.
- The best rollback mechanism may be the one too small to deserve a separate system.
- Cleanup has a cost, but so does rebuilding during a crisis.
- Codex could build the pipeline, but it could not design it.
- The missing input was a design, not another correction.
- Codex acted as though the solution was obvious once I supplied it.
- Generating more infrastructure was not the same as converging on the right infrastructure.
- I had to provide both the architecture and the pressure toward simplicity.

## Threads to revisit

- What was the original deployment architecture?
- What caching behavior was expected, and what did Codex configure instead?
- How exactly did the cached `composeApp.js` behave on the second release: browser cache, CloudFront cache, or both?
- What suggestions or actions from Codex were unhelpful, and why?
- What did Codex's proposed day-based CloudFront process do, step by step?
- What cache headers and CloudFront behaviors did the final design use for `index.html`, `composeApp.js`, and hashed assets?
- What realization led to the final design?
- What is the final architecture, component by component?
- How are old client and Lambda artifacts retained, and for how long?
- What resources or data actually need cleanup when an old release is retired?
- Are database schemas and shared persistent data compatible across concurrently running API versions?
- Which specific problems does the final architecture solve?
- What complexity did Codex try to introduce?
- What was removed or simplified, and what tradeoffs did that create?
- Which decisions are specific to Allies, and which lesson might transfer to other Codex-assisted DevOps work?
- What remains imperfect or unresolved in the current solution?
