<template>
    <div>
        <b-form-group label="Upload Image" label-cols-sm="2" label-size="sm">
            <b-form-file id="file-small" size="sm" accept="image/*"></b-form-file>
        </b-form-group>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        file: null
      }
    }
  }
</script>