---
title: "Rethinking the Unit vs Integration Testing Paradigm"
date: 2026-01-15
draft: true
showComments: true
comments: true
summary: "The story behind LithyLabs"
---

# The Problem With How We Talk About Tests

Most teams divide tests into two buckets:

* Unit tests – fast, isolated, heavily mocked
* Integration tests – slow, realistic, expensive

This mental model is so common that we rarely question it. We argue about how many unit tests vs integration tests we
should have, or where to draw the line between them.

What if we started from a different premise:

> How can we get the most realistic testing experience possible without the brittleness of integration tests?

# Where Mocks Break Down

The power of unit tests comes from the ability to quickly and easily ensure that changes to code haven’t broken
anything. We include them in automated builds specifically to catch regressions as early as possible.

For simple code, such as pure functions, this works well. Inputs and outputs are clear, tests are straightforward to
write, and failures are meaningful. Problems begin when code is no longer pure and must coordinate multiple components
to produce a result.

To keep these coordination tests focused, we traditionally rely on mocks to make complex systems behave like pure
functions. While this can simplify individual tests, it introduces real costs in writing and maintaining mocks, and it
limits how safe and inexpensive refactoring can be.

Mocks often encode assumptions about data shape, behavior, and interactions. If implementation details change without
triggering compile errors, tests may continue to pass while exercising outdated assumptions. Bugs then surface later
during integration testing or, worse, in production.

Instead of protecting behavior, these tests protect structure. As coordination logic evolves, heavily mocked tests
become a liability rather than a safety net.

