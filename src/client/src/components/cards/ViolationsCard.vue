<template>
  <Card :title="title" :hasPadding="hasPadding">
    <!-- Violations -->
    <ul
      v-if="violations !== undefined && violations.length > 0"
      class="violations"
    >
      <li
        v-for="(violation, index) in violations"
        :key="index"
        class="violation"
      >
        <div class="box-row">
          <!-- Violation Tilte -->
          <div class="main-title">
            {{ violation.mainTitle }}
          </div>
          <!-- Violation Badge -->
          <div class="badge">
            <span class="badge-title">
              {{ violation.badge }}
            </span>
          </div>
        </div>
        <div class="box-row box-row-margin">
          <!-- Left Value -->
          <div class="value-box">
            <div class="value-box-title">{{ violation.leftTitle }}:</div>
            <div class="value-box-margin">{{ violation.leftValue }}</div>
          </div>
          <!-- Right Value -->
          <div class="value-box value-box-margin">
            <div class="value-box-title">{{ violation.rightTitle }}:</div>
            <div class="value-box-margin">{{ violation.rightValue }}</div>
          </div>
        </div>
      </li>
    </ul>
    <!-- Empty -->
    <div v-else class="empty-box">No Violation!</div>
  </Card>
</template>

<script>
import { Card } from "@/components";

export default {
  name: "ViolationsCard",
  components: {
    Card,
  },
  props: {
    title: {
      type: String,
    },
    hasPadding: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      violations: [],
    };
  },
  watch: {
    data: function () {
      // If data is not null push the data to violations array
      if (this.data) {
        this.violations.push(this.data);

        // If violations has more than 3 elements pop out oldest one
        if (this.violations.length > 3) {
          this.violations = this.violations.slice(1);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.violation {
  padding: 1rem 0 1rem 0;
  border-bottom-width: 1px;
  border-color: $gray-light;
}

.violation:last-child {
  border-bottom-width: 0px;
}

.box-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-row-margin {
  margin-top: 0.5rem;
}

.main-title {
  font-size: $font-size-sm;
  line-height: 1.25rem;
  font-weight: $font-weight-medium;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge {
  margin-left: 0.5rem;
  display: flex;
  flex-shrink: 0;
}

.badge-title {
  display: inline-flex;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: $font-size-xs;
  line-height: 1.25rem;
  font-weight: $font-weight-medium;
  border-radius: 9999px;
  background-color: $red-lighter;
  color: $red;
}

.value-box {
  display: flex;
  align-items: center;
  font-size: $font-size-xs;
  line-height: 1.25rem;
  color: $gray;
}

.value-box-margin {
  margin-left: 0.25rem;
}

.value-box-title {
  font-size: $font-size-sm;
  color: $black;
}

.empty-box {
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-size: $font-size-sm;
  color: $gray;
  text-align: center;
  font-weight: $font-weight-medium;
}

@media (min-width: 640px) {
  .violation {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
