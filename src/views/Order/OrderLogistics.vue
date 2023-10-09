<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { Logistics, Location } from '@/types/order'
import { getMedicalOrderLogistics } from '@/service/order'
import AMaPLoader from '@amap/amap-jsapi-loader'
import { showFailToast } from 'vant'
import startImg from '@/assets/start.png'
import endImg from '@/assets/end.png'
import carImg from '@/assets/car.png'

const route = useRoute()
const logistics = ref<Logistics>()
onMounted(async () => {
    const res = await getMedicalOrderLogistics(route.params.id as string)
    logistics.value = res.data
    initMap()
})

// 进行配置高德地图 window全局对象  进行配置安全密钥
window._AMapSecurityConfig = {
    securityJsCode: 'e8b676df5e44b201a1bd73e31fbfa014'
}

// 进行初始化高德地图
const initMap = () => {
    AMaPLoader.load({
        key: '78436d33fb21159617777d6c7fb00030',
        version: '2.0'
    }).then((AMap) => {
        // 进行初始化地图
        // new AMap.Map(挂载div的id)
        const map = new AMap.Map('map', {
            mapStyle: 'amap://styles/whitesmoke',
            zoom: 12
        })
        AMap.plugin('AMap.Driving', function () {
            // 进行创建可复用的标记函数
            const getMarker = (point: Location, image: string, width = 25, height = 30) => {
                const icon = new AMap.Icon({
                    size: new AMap.Size(width, height),
                    image,
                    imageSize: new AMap.Size(width, height)
                })
                const marker = new AMap.Marker({
                    // 默认图片的定位是使用左上角对准坐标的，需要进行调整
                    position: [point?.longitude, point?.latitude],
                    icon,
                    // 左移12.5px 上移30px
                    offset: new AMap.Pixel(-width / 2, -height / 2)
                })
                return marker
            }
            // 进行绘制路径和进行配置路径
            const driving = new AMap.Driving({
                map, // 将路径进行
                showTraffic: false, // 配置是否进行展示路径的道路情况
                hideMarkers: true // 进行隐藏路径标志
            })
            if (!(logistics.value?.logisticsInfo && logistics.value?.logisticsInfo.length >= 2))
                return showFailToast('数据加载错误')
            const list = [...logistics.value.logisticsInfo]
            // 进行绘制起点路径
            const start = list.shift()
            const startMarker = getMarker(start!, startImg)
            map.add(startMarker)
            // 进行绘制重点路径
            const end = list.pop()
            const endMarker = getMarker(end!, endImg)
            map.add(endMarker)
            // 进行最终配置地图
            driving.search(
                [start?.longitude, start?.latitude],
                [end?.longitude, end?.latitude],
                {
                    waypoints: list.map((item) => [item.longitude, item.latitude])
                },
                () => {
                    // 规划完毕的函数
                    // 获取当前的运输位置
                    const curr = logistics.value?.currentLocationInfo
                    const currMarker = getMarker(curr!, carImg, 33, 20)
                    map.add(currMarker)
                    // 3s后进行定位到中间进行缩放
                    setTimeout(() => {
                        map.setFitView([currMarker])
                        map.setZoom(10)
                    }, 3000)
                }
            )
        })
    })
}
</script>

<template>
    <div class="order-logistics-page">
        <div id="map">
            <div class="title">
                <van-icon name="arrow-left" @click="$router.back()" />
                <span>{{ logistics?.statusValue }}</span>
                <van-icon name="service" />
            </div>
            <div class="current">
                <p class="status">订单派送中 预计{{ logistics?.estimatedTime }}送达</p>
                <p class="predict">
                    <span>{{ logistics?.name }}</span>
                    <span>{{ logistics?.awbNo }}</span>
                </p>
            </div>
        </div>
        <div class="logistics">
            <p class="title">物流详情</p>
            <van-steps direction="vertical" :active="0">
                <van-step v-for="item in logistics?.list" :key="item.id">
                    <p class="status">{{ item.statusValue }}</p>
                    <p class="content">{{ item.content }}</p>
                    <p class="time">{{ item.createTime }}</p>
                </van-step>
            </van-steps>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.order-logistics-page {
    --van-step-icon-size: 18px;
    --van-step-circle-size: 10px;
}
#map {
    height: 450px;
    background-color: var(--cp-bg);
    overflow: hidden;
    position: relative;
    .title {
        background-color: #fff;
        height: 46px;
        width: 355px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        font-size: 16px;
        position: absolute;
        left: 10px;
        top: 10px;
        box-sizing: border-box;
        box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
        z-index: 999;
        > span {
            flex: 1;
            text-align: center;
        }
        .van-icon {
            font-size: 18px;
            color: #666;
            &:last-child {
                color: var(--cp-primary);
            }
        }
    }
    .current {
        height: 80px;
        border-radius: 4px;
        background-color: #fff;
        height: 80px;
        width: 355px;
        box-sizing: border-box;
        padding: 15px;
        position: absolute;
        left: 10px;
        bottom: 10px;
        box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
        z-index: 999;
        .status {
            font-size: 15px;
            line-height: 26px;
        }
        .predict {
            color: var(--cp-tip);
            font-size: 13px;
            margin-top: 5px;
            > span {
                padding-right: 10px;
            }
        }
    }
}
.logistics {
    padding: 0 10px 20px;
    .title {
        font-size: 16px;
        padding: 15px 5px 5px;
    }
    .van-steps {
        :deep(.van-step) {
            &::after {
                display: none;
            }
        }
        .status {
            font-size: 15px;
            color: var(--cp-text3);
            margin-bottom: 4px;
        }
        .content {
            font-size: 13px;
            color: var(--cp-tip);
            margin-bottom: 4px;
        }
        .time {
            font-size: 13px;
            color: var(--cp-tag);
        }
    }
}
</style>
