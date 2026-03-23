<template>
  <el-scrollbar height="100%">
    <div class="dashboard_main">
      <div class="board">
        <h2 className="mb-4 font-bold tracking-tight text-foreground md:text-4xl text-balance">
          欢迎进入百维公司资产管理系统
        </h2>
        <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
          专业的企业资产管理解决方案，助力企业实现设备全生命周期管理，提升资产运营效率，降低维护成本。
        </p>
        <div class="button_group">
          <el-button type="primary" @click="jumpLink('DvTemperatureGauge')">开始使用</el-button>
          <el-button type="primary" plain>了解更多</el-button>
        </div>
      </div>
      <div class="function_discrption">
        <div>
          <h3 class="text-xl font-semibold text-foreground mb-sm">功能模块</h3>
          <p class="leading-relaxed text-muted-foreground text-sm">
            全面的资产管理功能，满足企业多样化需求
          </p>
        </div>
        <el-button plain>查看全部</el-button>
      </div>
      <div class="function_module">
        <el-card body-class="device_card cursor">
          <div class="card_header">
            <SettingsSvg />
            <div class="text-md" style="margin-left: 10px">
              <div>设备台账</div>
              <p className="text-lg leading-relaxed text-sm text-muted-foreground">
                专业的企业资产管理解决方案，助力企业实现设备全生命周期管理，提升资产运营效率，降低维护成本。
              </p>
              <el-button plain @click="jumpLink('DvTemperatureGauge')">点击进入</el-button>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="card_header">
            <fix />
            <div class="text-md" style="margin-left: 10px">
              维修管理
              <p className="text-lg leading-relaxed text-sm text-muted-foreground">
                专业的企业资产管理解决方案，助力企业实现设备全生命周期管理，提升资产运营效率，降低维护成本。
              </p>
              <el-button plain @click="jumpLink('/maintenance')">点击进入</el-button>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="card_header">
            <cube />
            <div class="text-md" style="margin-left: 10px">
              运行管理
              <p className="text-lg leading-relaxed text-sm text-muted-foreground">
                专业的企业资产管理解决方案，助力企业实现设备全生命周期管理，提升资产运营效率，降低维护成本。
              </p>
              <el-button plain @click="jumpLink('/disposal')">点击进入</el-button>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="card_header">
            <SettingsSvg />
            <div class="text-md" style="margin-left: 10px">
              专业管理
              <p className="text-lg leading-relaxed text-sm text-muted-foreground">
                专业的企业资产管理解决方案，助力企业实现设备全生命周期管理，提升资产运营效率，降低维护成本。
              </p>
              <el-button plain @click="jumpLink('/professional')">点击进入</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <div class="function_discrption">
        <div>
          <h3 class="text-xl font-semibold text-foreground mb-sm">用户资产</h3>
          <p class="leading-relaxed text-muted-foreground text-sm">
            我们的用户享受设备的全生命周期管理
          </p>
        </div>
        <el-button plain>查看全部</el-button>
      </div>
      <div class="function_module">
        <el-card>
          <div style="display: flex; justify-content: space-between">
            <div class="text-md">河南沃森超高化工科技有限公司</div>
            <dov><el-link type="primary">点击进入</el-link></dov>
          </div>
          <div class="text-sm text-muted-foreground">用户描述</div>
        </el-card>
        <el-card>
          <div style="display: flex; justify-content: space-between">
            <div class="text-md">濮阳市联众兴业化工有限公司</div>
            <dov><el-link type="primary">点击进入</el-link></dov>
          </div>
          <div class="text-sm text-muted-foreground">用户描述</div>
        </el-card>
        <el-card>
          <div style="display: flex; justify-content: space-between">
            <div class="text-md">濮阳蓝星新材料有限公司</div>
            <dov><el-link type="primary">点击进入</el-link></dov>
          </div>
          <div class="text-sm text-muted-foreground">用户描述</div>
        </el-card>
        <el-card>
          <div style="display: flex; justify-content: space-between">
            <div class="text-md">河南合汇物流有限公司</div>
            <dov><el-link type="primary">点击进入</el-link></dov>
          </div>
          <div class="text-sm text-muted-foreground">用户描述</div>
        </el-card>
        <el-card>
          <div style="display: flex; justify-content: space-between">
            <div class="text-md">河南雷佰瑞新材料科技有限公司</div>
            <dov><el-link type="primary">点击进入</el-link></dov>
          </div>
          <div class="text-sm text-muted-foreground">用户描述</div>
        </el-card>
        <el-card>
          <div style="display: flex; justify-content: space-between">
            <div class="text-md">华颂新材料科技有限公司</div>
            <dov><el-link type="primary">点击进入</el-link></dov>
          </div>
          <div class="text-sm text-muted-foreground">用户描述</div>
        </el-card>
        <el-card>
          <div style="display: flex; justify-content: space-between">
            <div class="text-md">清丰碳足迹再生资源有限公司</div>
            <dov><el-link type="primary">点击进入</el-link></dov>
          </div>
          <div class="text-sm text-muted-foreground">用户描述</div>
        </el-card>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import router from "@/router";
let nameArr: string[] = [];
onMounted(() => {
  console.log("chushijiazai");
  const allRouters = router.getRoutes();
  nameArr = allRouters.map((route) => route.name) as string[];
});
const jumpLink = (name: string) => {
  const hasRoute = nameArr.includes(name);
  if (hasRoute) {
    router.push({
      name,
    });
  }
  return;
};
</script>

<style lang="scss" scoped>
.dashbard_main {
  width: 100%;
}
.cursor {
  cursor: pointer;
}
.board {
  height: 276px;
  padding: 40px;
  margin: 20px;
  border-radius: 1rem;
  border: #ffffee solid 1px;
  background-color: white;
}
html.dark {
  .board {
    height: 276px;
    padding: 40px;
    margin: 20px;
    border-radius: 1rem;
    border: oklch(0.28 0.01 250) solid;
    background-color: oklch(0.18 0.01 250);
  }
}
.text-balance {
  text-wrap: balance;
}
.text-foreground {
  color: black;
}
html.dark {
  .text-foreground {
    color: oklch(0.98 0 0);
  }
}
.font-bold {
  --tw-font-weight: 700;
  font-weight: 700;
}
.mb-4 {
  margin-bottom: calc(0.2rem * 4);
}
.tracking-tight {
  --tw-tracking: -0.025em;
  letter-spacing: -0.025em;
}
.text-muted-foreground {
  color: oklch(0.65 0 0);
}
.button_group {
  display: flex;
  flex-wrap: wrap;
  gap: calc(0.25rem * 3);
}
.function_module {
  display: grid;
  gap: calc(00.25rem * 4);
}
.function_discrption {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.text-xl {
  font-size: 1.25rem;
  --leading-relaxed: 1.625;
}
.text-md {
  font-size: 1rem;
  --leading-relaxed: 1.625;
}
.text-sm {
  font-size: 0.875rem;
  line-height: var(--tw-leading, calc(1.25 / 0.875));
}
.font-semibold {
  --tw-font-weight: 600;
  font-weight: 600;
}
.mb-sm {
  margin: 5px;
}
.function_module {
  margin: 20px;
  display: grid;
  gap: calc(00.25rem * 4);
}
@media (max-width: 767px) {
  .function_module {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media (min-width: 767px) and (max-width: 800px) {
  .function_module {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 800px) {
  .function_module {
    grid-template-columns: repeat(4, 1fr);
  }
}
.card_header {
  display: flex;
  gap: 5px;
}
</style>
