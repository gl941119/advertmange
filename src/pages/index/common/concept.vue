<template>
	<div class="concept">
		<div class="concept-personal">
			<el-button :class="{'button-selected': item.isSelected}" class="concept-personal-button" @click="checked(item,index)" v-for="(item, index) in concept" :key="index" size="small" round>{{item.name.zh}}</el-button>
		</div>
	</div>
</template>

<script>
	import Request from '../../../utils/require.js';
	export default {
		props:["listenCondept"],
		data() {
			return {
				concept: [],
				checkedData: [],
			}
		},
		mounted() {
			this.conceptData();
		},
		methods: {
			conceptData() {
				let params = {
					url: 'QueryAllConceptLink',
					type: 'post',
					flag:true
				}
				Request.requestHandle(params, res => {
					this.concept = res.data;
				});
			},
			checked(item, index) {
				
				var length = this.checkedData.length;
				item.isSelected = !item.isSelected;
				if(item.isSelected) {
					if(length < 4) {
					
						var obj={};
						obj.id=item.id;
						obj.name=item.name.zh;
						this.checkedData.push(obj);
					
						this.$emit('listenCondept',this.checkedData);
					} else {
						item.isSelected = false;
						this.$message('最多四个哦，不能再多了');
					}
				} else {
					let _index = this.checkedData.findIndex(v => item.name === v.name);
					this.checkedData.splice(_index, 1)
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.concept-personal-button {
		margin-bottom: 15px;
	}
	
	.button-selected {
		background: #2096f3;
		color: #FFFFFF;
	}
</style>