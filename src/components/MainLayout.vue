<template>
  <main>
    <div class="card">
      <RouterView />
    </div>
  </main>
</template>

<style lang="postcss" scoped>
main {
  @apply flex h-screen items-center justify-center bg-gradient-to-tr from-green-300 via-yellow-300 to-pink-300;

  & .card {
    @apply flex h-5/6 min-h-fit w-2/3 flex-col items-center gap-16 overflow-auto rounded-lg bg-white p-8 shadow-lg;
  }
}
</style>
