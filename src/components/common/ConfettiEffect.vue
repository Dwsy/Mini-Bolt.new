<template>
  <div v-if="isActive" class="confetti-container">
    <div
      v-for="(confetti, index) in confettis"
      :key="index"
      class="confetti"
      :style="confetti.style"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 4000, // 特效持续时间（毫秒）
  },
  particleCount: {
    type: Number,
    default: 88, // 纸屑数量
  },
});

// 定义事件，用于通知父组件特效结束
const emit = defineEmits(["complete"]);

const isActive = ref(props.active);
const confettis = ref([]);
let timer = null;

// 生成随机颜色
const getRandomColor = () => {
  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// 初始化纸屑
const initConfetti = () => {
  confettis.value = [];
  for (let i = 0; i < props.particleCount; i++) {
    const size = Math.random() * 10 + 5; // 5-15px
    const color = getRandomColor();
    const left = Math.random() * 100; // 0-100%
    const animationDuration = Math.random() * 3 + 2; // 2-5s
    const animationDelay = Math.random() * 2; // 0-2s

    // 随机选择形状类型
    const shapeType = Math.floor(Math.random() * 4); // 0-3，对应四种不同形状
    let shape = {};

    switch (shapeType) {
      case 0: // 圆形
        shape = {
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          borderRadius: "50%",
        };
        break;
      case 1: // 正方形
        shape = {
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
        };
        break;
      case 2: // 三角形
        shape = {
          width: "0",
          height: "0",
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,
          backgroundColor: "transparent",
        };
        break;
      case 3: // 星形/菱形
        shape = {
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          transform: `rotate(45deg) scale(0.7)`,
        };
        break;
    }

    confettis.value.push({
      style: {
        ...shape,
        left: `${left}%`,
        animationDuration: `${animationDuration}s`,
        animationDelay: `${animationDelay}s`,
        opacity: Math.random() * 0.7 + 0.3, // 0.3-1.0
        transform: `${shape.transform || ""} rotate(${Math.random() * 360}deg)`,
      },
    });
  }
};

// 开始撒花效果
const startConfetti = () => {
  isActive.value = true;
  initConfetti();

  // 设置定时器，在指定时间后关闭特效
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    isActive.value = false;
    // 触发完成事件，通知父组件
    emit("complete");
  }, props.duration);
};

// 监听active属性变化
watch(
  () => props.active,
  (newVal) => {
    if (newVal) {
      startConfetti();
    } else {
      isActive.value = false;
    }
  }
);

// 组件挂载时如果active为true，则自动启动特效
onMounted(() => {
  if (props.active) {
    startConfetti();
  }
});

// 在组件卸载时清除定时器
onUnmounted(() => {
  if (timer) clearTimeout(timer);
});

// 向外暴露方法，让父组件可以手动触发
defineExpose({
  start: startConfetti,
});
</script>

<style scoped>
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.confetti {
  position: absolute;
  top: -20px;
  border-radius: 50%;
  animation: fall linear forwards;
}

@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
</style>
