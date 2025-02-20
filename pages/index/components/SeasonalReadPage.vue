<template>
    <view class="cf-flex-col cf-justify-start cf-relative page" :style="pageStyle">
        <view class="section"></view>
        <image class="image_2 pos_2"
            src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/e11edf570e79834f348a31a56da4999a.png"
            @tap="navigateBack" />
        <view class="cf-flex-col cf-justify-start cf-items-center section_2 pos_3">
            <view class="cf-flex-col cf-justify-start cf-items-center text-wrapper"><text class="font text">{{ readCount
            }}</text>
            </view>
        </view>
        <view class="cf-flex-col cf-justify-start cf-items-center section_3 pos_4">
            <view class="cf-flex-col cf-justify-start cf-items-center text-wrapper_2">
                <text class="font text_2">{{ currentIndex }}/{{ totalItems }}</text>
            </view>
        </view>
        <view class="cf-flex-col cf-justify-start cf-items-center section_4 pos_5"><text class="text_3">{{ term
        }}</text></view>
        <text class="font_2 pos_6">{{ content }}</text>
    </view>
</template>


