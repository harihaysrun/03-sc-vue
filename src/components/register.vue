<template>
  <div>
    <div>
      <label for="">Name: </label>
      <input type="text" v-model="name" class="form-control" />
    </div>
    <div>
      <label for="">Email: </label>
      <input type="text" v-model="email" class="form-control" />
    </div>
    <div>
      <button v-on:click="submit" class="btn btn-primary mt-3">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      name: "",
      email: "",
    };
  },
  methods: {
    submit: function () {
      this.$emit("on-submit", {
        name: this.name,
        email: this.email,
      });
    },
  },
};
</script>