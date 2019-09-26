## Use SQRS and Event Sourcing to Scale Read API

```
+---------------------+    +-------------+    +------------+
|                     |    |             |    |            |
|       Client        +--->+  Write API  +--->+  Database  +---+
|                     |    |             |    |            |   |
|   Command { ... }   |    +-------------+    +------------+   |
|                     |                                        |
|                     |    +-------------+    +------------+   |
|   Query { ... }     |    |             |    |            |   |
|                     +--->+  Read API   +--->+  Read DB   +<--+
|                     |    |             |    |            |   |
|                     |    +-------------+    +------------+   |
|                     |                                        |
|                     |    +-------------+    +------------+   |
|                     |    |             |    |            |   |
|                     +--->+  Read API   +--->+  Read DB   +<--+
|                     |    |             |    |            |
+---------------------+    +-------------+    +------------+
```

* Use patterns: Command, Query Object
* Separate Read and Write APIs
* Scale Database: use multiple replicas for read
* Use Event Sourcing (message bus) for DB sync
