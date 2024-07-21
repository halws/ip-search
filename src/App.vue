<template>
  <main

    p="x-4 y-10"
    text="center gray-700 dark:gray-200"

    h-full flex flex-col justify-center font-sans
  >
    <div flex flex-col items-center>
      <RouterView />
      <TheFooter />
    </div>
  </main>
</template>
