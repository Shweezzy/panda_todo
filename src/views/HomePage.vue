<template>
  <div class="container">
    <div class="head center">
      <h1>Todo list</h1>
    </div>
    <div class="todos">
      <div class="todos__empty" v-if="!notes.length">
        <hr />

        <h3>There is no notes available. To create new one click down here</h3>
        <button class="todos__add" @click="$router.push('/todos')">Add new todo</button>

        <hr />
      </div>
      <vue-scroll>
        <ul>
          <note-item v-for="(note, index) in notes" :note="note" :key="index" @remove-note="removingNote"></note-item>
        </ul>
      </vue-scroll>

      <button class="todos__add-note head" @click="$router.push('/todos')" v-if="notes.length">Add new todo</button>
    </div>
  </div>
</template>

<script>
import NoteItem from "@/components/NoteItem.vue";

export default {
  name: "HomePage",
  components: {
    NoteItem,
  },
  data() {
    return {
      notes: [],
    };
  },
  methods: {
    removingNote(note) {
      const i = this.notes.findIndex((e) => e === note);
      this.notes.splice(i, 1);
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
  },
  mounted() {
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];
    if (!this.notes.length) localStorage.setItem("notes", JSON.stringify(this.notes));
  },
};
</script>

<style scoped lang="scss">
.todos {
  height: 500px;

  .todos__empty {
    width: 100%;
    text-align: center;

    .todos__add {
      position: relative;
      font-size: 14px;
      font-weight: 500;

      color: #fff;
      background: #000;
      margin: 1% 0;
      padding: 0.55%;

      border: 1px solid #000;
      border-radius: 15px;
      background-position: 0% 50%;

      transition: 0.2s all ease;

      &:hover {
        color: #000;
        background: transparent;
      }
    }
  }
  .todos__add-note {
    float: right;
    font-size: 18px;
    border-radius: 15px;
    padding: 5px;
  }
}
</style>
