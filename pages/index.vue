<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-html="content"></div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      showMountain: true,
      refreshing: false
    }
  },
  async asyncData({ $axios, error, store }) {
    return {
      _id: '641adaf562e624dd6761ad59',
      id: '641ada7762e624dd6761ad51',
      pathKey: 'test',
      title: '121212',
      content: 'dfadsfasdf53563456',
      createTime: '2023-03-22T10:39:49.761Z',
      updateTime: '2023-04-11T06:02:10.341Z',
    }
  },
}
</script>