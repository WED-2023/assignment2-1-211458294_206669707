<template>
    <div class="timeline">
      <ul>
        <li v-for="event in events" :key="event.title" class="event-item">
          <!-- Using a wrapper div for the popover target to ensure smooth hovering -->
          <div :id="'popover-target-' + event.year" class="event-marker-wrapper">
            <b-badge variant="dark" pill class="event-marker">{{ event.year }}</b-badge>
            <b-popover :target="'popover-target-' + event.year"
                       triggers="hover focus"
                       placement="top"
                       :content="event.content"
                       :title="event.title">
              <template #default="{ hide }">
                <b-card style="width: 300px;" class="text-white bg-info mb-3">
                  <b-card-header>
                    <b-icon :icon="event.icon" aria-hidden="true"></b-icon>
                    {{ event.year }}
                  </b-card-header>
                  <b-card-body>
                    <b-card-title>{{ event.title }}</b-card-title>
                    <b-card-text>{{ event.content }}</b-card-text>
                    <!-- <b-button size="sm" @click="hide">Close</b-button> -->
                    <b-button size="sm" @click="() => { console.log('Closing popover'); hide(); }">Close</b-button>
                  </b-card-body>
                </b-card>
              </template>
            </b-popover>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InteractiveTimeline',
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
            content: "We teamed up at the beginning of our second year and work as partners since then!",
            icon: "mdi-account-group"
          },
          {
            year: "Last Semester",
            title: "Starship Internship",
            content: "Last semester, we both participated in 'Starship'—the department’s internship program, where we were thrilled to be accepted into the same company and assigned to the same team! Working closely together, we not only learned a great deal but also had loads of fun.",
            icon: "mdi-rocket-launch"
          },
          {
            year: "Ongoing",
            title: "Gaining Experience",
            content: "We both hold student positions, where we are gaining invaluable hands-on experience and deepening our knowledge in the field. It's an exciting part of our journey, allowing us to apply what we learn in real-world scenarios.",
            icon: "mdi-briefcase"
          }
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .timeline ul {
    display: flex;
    justify-content: space-evenly;
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: 100px; /* Adjust based on your design */
  }
  
  .event-item {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .event-marker-wrapper {
    cursor: pointer;
    position: relative; /* Ensures that the popover is correctly positioned */
  }
  
  .event-marker {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .timeline::after {
    content: '';
    position: absolute;
    top: 40%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #ccc;
    z-index: 0;
  }
  </style>
  