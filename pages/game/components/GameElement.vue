<template>
    <view class="game-element" :class="{ 'visible': isVisible }" :style="elementStyle">
        <image :src="element.image" class="element-image" mode="aspectFill" />
        <view class="shadow-mask" v-if="!isVisible"></view>
        <text v-if="debug" class="debug-info">{{ element.id }}</text>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { MapElement } from '../store/map'; // Update the import path to be relative

const props = defineProps<{
    element: MapElement;
    isVisible: boolean;
    position: { x: number; y: number };
    debug?: boolean;
}>();

const emit = defineEmits<{
    (e: 'click', element: MapElement): void;
}>();

const elementStyle = computed(() => ({
    gridColumn: `${props.position.x * 2 + 1} / span 2`, // 乘以2是因为每个元素占2格
    gridRow: `${props.position.y * 2 + 1} / span 2`,    // span 2表示占据2个格子
    zIndex: props.element.position.layer,
    backgroundColor: props.isVisible ? '#ffffff' : '#000000',
    opacity: props.isVisible ? '1' : '0.5'
}));

const handleClick = () => {
    if (props.isVisible) {
        emit('click', props.element);
    }
};
</script>

<style scoped>
.game-element {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4rpx;
    overflow: hidden;
    transition: all 0.3s ease;
}

.element-image {
    width: 90%;
    height: 90%;
    object-fit: contain;
}

.shadow-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
}

.debug-info {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #ff0000;
    font-size: 24rpx;
    font-weight: bold;
    text-shadow:
        -1px -1px 0 #fff,
        1px -1px 0 #fff,
        -1px 1px 0 #fff,
        1px 1px 0 #fff;
    z-index: 2;
}

.visible {
    cursor: pointer;
    box-shadow: 0 0 10rpx rgba(255, 255, 255, 0.5);
}

.visible:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20rpx rgba(255, 255, 255, 0.8);
}
</style>
