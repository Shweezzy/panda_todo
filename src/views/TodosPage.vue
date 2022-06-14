<template>
  <div class="todo-page container">
    <div class="head center">
      <h1>Note description</h1>
    </div>

    <hr />

    <div class="todo__form">
      <h2>Note title:</h2>
      <input type="text" v-model="note.title" placeholder="type text here..." />
      <div class="todo__actions">
        <div v-show="histotyIndex > 0">
          <button class="todo__action prev" @click="prev"></button>
          <button class="todo__action next" @click="next"></button>
        </div>
      </div>

      <div class="todo__items">
        <vue-scroll>
          <div class="todo__empty" v-if="note.todos && !note.todos.length">To add a task, click the plus sign in the lower left corner</div>
          <ul>
            <todo-item v-for="(todo, index) in note.todos" :todo="todo" :key="index" @remove-todo="removingTodo" />
          </ul>
        </vue-scroll>
      </div>

      <div class="todo__buttons">
        <div>
          <button class="todo__handler add" @click="addTodo"></button>
        </div>

        <div class="todo__note-action">
          <button class="todo__handler save" @click="saveNote"></button>
          <button class="todo__handler remove" @click="showModal = true"></button>
          <button class="todo__handler previous-page" @click="previousPage"></button>
        </div>
      </div>
    </div>

    <popup v-if="showModal" @close="showModal = false" @usersDecision="changeDecision"></popup>
  </div>
</template>

<script>
import TodoItem from "../components/TodoItem.vue";
import Popup from "../components/Popup.vue";

export default {
  components: {
    TodoItem,
    Popup,
  },
  data() {
    return {
      noteId: "",
      fetchNotes: [],
      note: {},
      showModal: false,
      usersDecision: true,
      noteHistory: [],
      histotyIndex: 0,
      watching: true,
    };
  },
  watch: {
    note: {
      handler(val) {
        if (this.watching) {
          this.noteHistory.push(JSON.parse(JSON.stringify(val)));
          this.histotyIndex = this.noteHistory.length - 1;
        } else {
          this.watching = true;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.noteId = this.$route.params.noteId;
    this.fetchNotes = JSON.parse(localStorage.getItem("notes") || []);
    if (this.noteId) {
      const i = this.fetchNotes.findIndex((e) => e.noteId === this.noteId);

      if (i === -1) return;
      return (this.note = this.fetchNotes[i]);
    } else {
      this.note = {
        noteId: btoa(Math.random()).substring(0, 6),
        title: "",
        todos: [],
      };
    }
  },
  methods: {
    addTodo() {
      this.note.todos.push({
        text: "",
        completed: false,
      });
    },
    removingTodo(todo) {
      let i = this.note.todos.indexOf(todo);

      this.note.todos.splice(i, 1);
    },
    changeDecision(response) {
      this.usersDecision = response;
      this.deleteNote();
    },
    deleteNote() {
      const i = this.fetchNotes.findIndex((e) => e.noteId === this.noteId);

      if (!this.usersDecision) return;
      else if (i !== -1) {
        this.fetchNotes.splice(i, 1);

        localStorage.setItem("notes", JSON.stringify(this.fetchNotes));
      }
      this.$router.push("/");
    },
    saveNote() {
      const i = this.fetchNotes.findIndex((e) => e.noteId === this.noteId);

      if (i === -1) {
        this.fetchNotes.push(this.note);
      } else {
        this.fetchNotes.splice(i, 1, this.note);
      }

      localStorage.setItem("notes", JSON.stringify(this.fetchNotes));

      if (!this.usersDecision) return;
      this.$router.push("/");
    },
    previousPage() {
      this.saveNote();
    },
    prev() {
      this.watching = false;
      if (this.histotyIndex > 0) {
        this.histotyIndex -= 1;
        this.note = this.noteHistory[this.histotyIndex];
      }
    },
    next() {
      this.watching = false;
      if (this.histotyIndex < this.noteHistory.length - 1) {
        this.histotyIndex += 1;
        this.note = this.noteHistory[this.histotyIndex];
      }
    },
  },
};
</script>

<style scoped lang="scss">
.todo-page {
  button {
    border: 0;
    height: 30px;
    width: 36px;
    margin: 1%;
  }

  .todo__form {
    height: 500px;

    margin: 5% auto;
    background: transparent;
    backdrop-filter: blur(1.5px) saturate(100%) brightness(100%);
    border: 1px solid #000;
    border-radius: 35px;

    h2 {
      margin: 2%;
    }

    input {
      width: 50%;
      background: transparent;

      outline: none;
      border: none;
      border-bottom: 1px solid #000;
      margin-left: 2%;

      transition: 0.2s;

      &:focus {
        margin-left: 10%;
        transform: scale(1.3);
      }
    }
  }

  .todo__items {
    height: 280px;
    width: 99%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    ul {
      width: 80%;
    }

    .todo__empty {
      text-align: center;
      font-size: 20px;
    }
  }
  .todo__actions {
    height: 51px;

    div {
      width: 100%;
      height: 100%;
      .prev {
        background: url("../assets/images/buttons/prev.png") no-repeat center/contain;
      }

      .next {
        background: url("../assets/images/buttons/next.png") no-repeat center/contain;
      }
    }
  }
  .todo__buttons {
    display: flex;
    padding: 0 1%;
    justify-content: space-between;

    .add {
      background: url("../assets/images/buttons/add.png") no-repeat center/contain;
    }

    .todo__note-action {
      width: 10%;
      display: flex;
      justify-content: space-around;

      .remove {
        background: url("../assets/images/buttons/delete.png") no-repeat center/contain;
      }

      .save {
        background: url("../assets/images/buttons/save.png") no-repeat center/contain;
      }

      .previous-page {
        position: absolute;
        top: 15px;
        background: url("../assets/images/buttons/previous-page.png") no-repeat center/contain;
      }
    }
  }
}
</style>
