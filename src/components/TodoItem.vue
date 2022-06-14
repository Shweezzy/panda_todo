<template>
  <li class="todo__item">
    <input v-model="todo.completed" type="checkbox" />

    <div class="todo__text">
      <span :class="{ completed: todo.completed }" v-if="!editable" @click="editable = !editable">
        {{ todo.text ? todo.text : "Double click to edit" }}
      </span>
      <input v-else type="text" v-model="todo.text" v-on:keyup.enter="editable = !editable" v-click-outside="isEditMode" />
    </div>

    <div class="todo__btns">
      <button class="btns-remove" @click="$emit('remove-todo', todo)"></button>
    </div>
    <hr />
  </li>
</template>

<script>
export default {
  components: {},
  props: {
    todo: { type: Object, default: () => {} },
  },
  data() {
    return {
      editable: false,
    };
  },
  methods: {
    isEditMode() {
      this.editable = false;
    },
  },
};
</script>

<style scoped lang="scss">
.todo__item {
  list-style: none;
  display: flex;
  font-size: 19px;
  flex-wrap: wrap;

  .completed {
    color: green;
  }

  .todo__btns {
    margin-left: auto;

    .btns-remove {
      background: url("../assets/images/buttons/delete.png") no-repeat center/contain;
      border: 0px;
      width: 27px;
      height: 27px;
      float: right;
    }
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-right: 20px;
    margin-top: 4px;
  }
  .todo__text {
    width: 70%;

    input[type="text"] {
      width: 100%;
      border: none;
      background: transparent;
      box-shadow: 2px 0px 5px 0px #000;
      border-radius: 5px;
      padding: 3px;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
