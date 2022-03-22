<template>
    <div>
        Homepage

            <ul>
              <li
                v-for="eachCustomer in $store.getters.customers"
                v-bind:key="eachCustomer.id"
              >
                {{ eachCustomer.username }}
                <router-link
                  v-bind:to="{ name: 'Edit', params: { userid: eachCustomer.id } }"
                  class="btn btn-primary"
                  >Edit</router-link
                >
              </li>
            </ul>
    </div>
</template>

<script>
export default{
  name: 'Home'
}
</script>