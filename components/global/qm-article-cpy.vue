<template>
<div>
    <div class="article-mask"></div>
    <article class="article">
        <!-- <h1 v-if="title != undefined && title != ''">{{ title }}</h1>
        <p class="article-title-tips" v-if="publishTime != undefined && publishTime != ''">最后更新、生效和发布日期：{{ publishTime }}</p> -->
        <div v-html="content"></div>
    </article>
</div>
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss">
$first_color: #222;
$second_color: #666;
$third_color: #999;
$orange_color: #fca000;
$border_color: #ebebeb;
$body_bg_color: #f5f5f5;
.article {
    padding: 32px 40px 88px;
    position: relative;
    z-index: 10;
    word-break: break-all;

    h1 {
        font-size: 36px;
        text-align: center;
        line-height: 50px;
        padding-bottom: 16px;
        font-weight: bold;
    }

    &-signature {
        text-align: right;
        line-height: 38px;
        font-size: 28px;
        color: $second_color;
    }

    .text-right {
        text-align: right;
    }

    h2 {
        text-align: center;
        font-size: 24px;
        line-height: 34px;
        color: $third_color;
        padding-bottom: 64px;
    }

    dl {
        text-align: justify;
        dt {
            line-height: 50px;
            font-size: 36px;
            color: $first_color;
            font-weight: bold;

            span {
                font-weight: normal;
                font-size: 32px;
                color: $second_color;

                strong {
                    font-weight: bold;
                    color: $first_color;
                }
            }
        }

        dd {
            margin: 0;
            padding: 16px 0 80px;
            p {
                line-height: 48px;
                font-size: 32px;
                color: $first_color;
                padding-bottom: 16px;

                &.tips {
                    text-align: center;
                    font-size: 24px;
                    line-height: 34px;
                    color: $third_color;
                    padding-bottom: 64px;
                }

                &.tit {
                    font-size: 36px;
                    line-height: 50px;
                }

                &.text-center {
                    text-align: center;
                }

                &.text-right {
                    text-align: right;
                }

                &.indent {
                    text-indent: 2em;
                }

                &.no-pb {
                    padding-bottom: 0;
                }

                strong,
                em {
                    color: $first_color;
                    font-weight: bold;

                    &.red {
                        color: red;
                    }

                    a {
                        color: $first_color;

                        &:hover {
                            color: $first_color;
                        }
                    }
                }

                strong {
                    font-weight: bold;
                }

                a {
                    color: $orange_color;

                    &:hover {
                        color: $orange_color;
                    }
                }

                .icon {
                    width: auto !important;
                    height: 40px;
                    display: inline-block;
                    vertical-align: top;
                    padding: 4px 5px 0;
                }

            }

            img {
                width: 80% !important;
                display: block;
                padding-top: 20px;
                margin: 0 auto;

                &.auto {
                    width: 100% !important;
                    padding-top: 0;
                    padding-bottom: 20px;

                    &.pb32 {
                        padding-bottom: 32px;
                    }

                    &.pb48 {
                        padding-bottom: 48px;
                    }
                }
            }
        }
    }

    table {
        border-bottom: 2px solid $border_color;
        border-right: 2px solid $border_color;
        width: 100%;
        margin-bottom: 32px;

        &.word-break {
            word-break: break-word;
        }

        th,
        td {
            line-height: 48px;
            font-size: 28px;
            padding: 6px;
            text-align: center;
            border-left: 2px solid $border_color;
            border-top: 2px solid $border_color;
            vertical-align: middle;

            a {
                color: $orange_color;

                &:hover {
                    color: $orange_color;
                }
            }
            &.text-left{
                text-align: left;
            }
        }

        th {
            background: $body_bg_color;
        }

        &.text-left {
            td {
                text-align: left;
            }
        }
    }

    &.gray {
        dl {
            dd {
                p {
                    color: $second_color;

                    &.notice {
                        font-size: 28px;
                        line-height: 40px;
                        color: $second_color;

                        strong,
                        em {
                            color: $second_color;
                        }
                    }
                }
            }
        }
    }

    &.break-word {
        word-break: break-word;
    }

    &.pb0 {
        padding-bottom: 0;
    }

    &-mask {
        background: #fff;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .bottom-name{
        display: block;
        text-align: right;
        font-size: 32px;
        line-height: 48px;
        padding: 30px 0 0 0;
        font-weight: 700;
    }
}
</style>
