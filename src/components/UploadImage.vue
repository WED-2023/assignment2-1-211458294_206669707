<template>
  <div>
    <b-form-group label="Upload Image" label-cols-sm="2" label-size="sm">
      <b-form-file 
        id="file-small" 
        size="sm" 
        accept="image/*" 
        @change="onFileChange">
      </b-form-file>
    </b-form-group>
  </div>
</template>
  
<script>
export default {
  props: {
    value: {
      type: File,
      default: null
    }
  },
  data() {
    return {
      file: this.value
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      this.file = file;
      this.$emit('input', file);
    }
  },
  watch: {
    value(newValue) {
      this.file = newValue;
    }
  }
}
</script>
