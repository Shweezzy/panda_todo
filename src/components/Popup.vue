<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body"> Are you sure you want to do that? </slot>
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="handler(false)">No, wait</button>
            <button class="modal-default-button" @click="handler">Sure</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    handler(usersDecision = false) {
      this.$emit("usersDecision", usersDecision);
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 5% 5%;
  background-color: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
  backdrop-filter: blur(1.5px) saturate(100%) brightness(100%);
}

.modal-body {
  font-size: 19px;
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  color: #fff;
  background: #000;
  border: none;
  border: 1px solid #000;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
