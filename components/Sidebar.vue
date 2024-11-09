<template>
  <div class="sidebar">
    <span>Diary</span>
    <div class="sidebar__content">
      <h2>
        It's empty... for now. <br>
        <span>
          Start writing your 
          first thoughts and ideas!
        </span>
      </h2>
      <div class="sidebar__notes">
        <NoteCard />
      </div>
    </div>
    <button>
      <NuxtImg src="/images/xmark-solid.svg" alt="xmark" />
    </button>
  </div>
</template>

<script setup>

</script>