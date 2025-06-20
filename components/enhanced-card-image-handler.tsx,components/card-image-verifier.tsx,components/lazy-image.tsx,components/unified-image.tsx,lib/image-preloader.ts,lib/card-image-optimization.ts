;/>
\
1. In each listed file replace  
   \`
import Image from
"next/image\"`  
with  \
   `import NextImage from "next/image"`
\
2. In JSX change every leading tag from `<Image` → `<NextImage` and the closing tags accordingly (self-closing tags remain `<NextImage … />`).

3. Replace every occurrence of  
   `new Image()` **or** `Image()`
with  
   \`new window.Image()`
\
   Example replacement snippet:

```diff
-
const img = new Image()
+
const img = new window.Image()
