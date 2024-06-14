<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <ItemTwoFields 
        :item="item" 
        :index="index" 
        @remove="removeItem"
        @save="saveItem"
      />
    </div>
    <b-button @click="addItem">Add Item</b-button>
    <div v-if="formError" class="text-danger mt-2">{{ formError }}</div>
  </div>
</template>

<script>
import ItemTwoFields from './ItemTwoFields.vue';

export default {
  components: {
    ItemTwoFields
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      items: this.value,
      formError: '',
      newItemAdded: false
    };
  },
  methods: {
    addItem() {
      this.formError = ''; // Reset the error message
      if (this.validateItems(false)) { // Validate all items before adding a new one
        this.items.push({ firstField: '', secondField: '' });
        this.newItemAdded = true;
      }
    },
    removeItem(index) {
      if (this.items.length <= 1) {
        this.formError = 'You must add at least one item.';
      } else {
        this.items.splice(index, 1);
        this.validateItems(false);
      }
    },
    saveItem({ index, item }) {
      this.items.splice(index, 1, item);
      this.validateItems(false);
    },
    validateItems(skipLast = false) {
      this.formError = '';
      const len = skipLast ? this.items.length - 1 : this.items.length;
      if (len < 1) {
        this.formError = 'You must add at least one preperation step.';
        return false;
      }
      for (let i = 0; i < len; i++) {
        if (!this.items[i].firstField) {
          this.formError = `Item ${i + 1} has an invalid step title.`;
          return false;
        }
      }
      return true;
    }
  },
  watch: {
    items: {
      handler(newItems) {
        if (this.newItemAdded) {
          this.newItemAdded = false;
        } else {
          this.validateItems(false);
        }
        this.$emit('input', newItems);
      },
      deep: true
    },
    value: {
      handler(newValue) {
        this.items = newValue;
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.text-danger {
  color: red;
}
</style>
