<template>
  <div class="about-page container my-5">
    <b-container>
      <b-row>
        <b-col cols="12" class="text-center">
          <h1>About Us</h1>
          <p class="lead">We are Adi and Tiltan, and welcome to our website!</p>
          <p class="lead">A little bit of who we are and our jurney...</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <interactive-timeline :events="events"></interactive-timeline>
        </b-col>
      </b-row>
      <b-row>
  <b-col cols="12" class="text-center">
      <h1>Welcome to Matkonim—What's This Project About?</h1>
      <p class="lead">Matkonim is a vibrant platform for sharing recipes and exploring new culinary worlds.</p>
      <p class="lead">You are more than welcome to draw inspiration from these recipes and share your own culinary creations with our community!</p>
  </b-col>
</b-row>

    </b-container>
  </div>
</template>

<script>
import InteractiveTimeline from '@/components/InteractiveTimeline.vue'; // Import the custom timeline component

export default {
  name: 'AboutPage',
  components: {
    InteractiveTimeline
  },
  data() {
    return {
        events: [
        {
          year: "First Year",
          title: "Beginning Our Journey",
          content: "Our academic adventure began with pre-academic studies during the summer, immediately followed by embarking on our first year at the university. This pivotal year set the foundation for our future endeavors in software and information system engineering.",
          icon: "mdi-school"
          },

        {
          year: "Second Year",
          title: "Teaming Up",
          content: "Began our collaboration, which has continued through various projects.",
          icon: "mdi-account-group"
        },
        {
          year: "Last Semester",
          title: "Starship Internship",
          content: "Both accepted to the same company, worked as team members.",
          icon: "mdi-rocket-launch"
        },
        {
          year: "Ongoing",
          title: "Gaining Experience",
          content: "Working in student positions, gathering hands-on experience in the field.",
          icon: "mdi-briefcase"
        }
      ]
    }
  }
}
</script>

<style scoped>
.lead {
  font-size: 1.25rem;
  font-weight: 300;
}
</style>