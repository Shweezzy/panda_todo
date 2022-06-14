<template>
  <li class="note__item">
    <div class="note__wrapper">
      <h1 @click="goToNote">{{ note.title || "Empty note title :(" }}</h1>

      <div class="note__btn">
        <button class="edit" @click="goToNote"></button>
        <button class="remove" @click="showModal = true"></button>
      </div>
    </div>

    <div class="note__todos" v-if="note.todos.length">
      <li v-for="(todo, index) in note.todos.slice(0, 3)" :todo="todo" :key="index">{{ todo.text || "empty todo" }}</li>
      <span v-if="note.todos.length > 2">...</span>
    </div>

    <hr />
    <popup v-if="showModal" @close="showModal = false" @usersDecision="changeDecision"></popup>
  </li>
</template>

<script>
import Popup from "../components/Popup.vue";

export default {
  components: {
    Popup,
  },
  props: {
    note: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showModal: false,
      usersDecision: true,
      fetchNotes: [],
    };
  },
  methods: {
    goToNote() {
      this.$router.push(`/note/${this.note.noteId}`);
    },
    changeDecision(value) {
      this.usersDecision = value;
      this.deleteNote();
    },
    deleteNote() {
      if (!this.usersDecision) return;
      else {
        this.$emit("remove-note", this.note);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.note__item {
  list-style: none;
  width: 98%;
  transition: transform 0.1s;
  cursor: pointer;

  .note__wrapper {
    display: flex;
    align-items: center;

    h1 {
      width: 700px;
      transition: transform 0.1s;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre;

      &:hover {
        transform: scale(1.01);
      }
    }
    .note__btn {
      margin-left: auto;

      button {
        border: 0px;
        width: 27px;
        height: 27px;
        margin: 5px;
      }

      .edit {
        background: url("../assets/images/buttons/edit.png") no-repeat center/contain;
      }

      .remove {
        background: url("../assets/images/buttons/delete.png") no-repeat center/contain;
      }
    }
  }
  .note__todos {
    margin-left: 3%;
    list-style: "- ";
  }
}
</style>
