import { http } from '../../server/api'

Component({
    options: {
        styleIsolation: 'shared'
    },
    properties: {
        flag: {
            type: String,
            value: ''
        },
        showGroup: {
            type: Boolean,
            value: false
        },
        showAdd: {
            type: Boolean,
            value: true
        },
        mutiSelect: {
            type: Boolean,
            value: true
        },
        callback: {
            type: Function,
            value: null
        },
    },

    data: {
        visible: false,
        tab: 0,
        tabLabel: '工友',
        list: [],
        memberList: [],
        groupList: [],
        materialList: [],
        selected: [],
    },

    methods: {
        async getListbyFlag() {
            const flag = this.properties.flag
            const tab = this.data.tab
            if(flag === 'material'){
                await this.getMaterial()
                this.setData({ list: this.data.materialList })
                return
            }else if(flag === 'group'){
                await this.getMembers()
            }else if(flag === 'attendance'){
                await this.getGroups()
                await this.getMembers()
            }

            const map = {
                0:this.data.memberList,
                1:this.data.groupList,
            }
            this.setData({ list: map[tab] })
        },

        async getMembers() {
            let params = {
                size: 999,
                page: 1,
                state: 0
            }
            await http.post('/acMember/getMembers', params).then(res => {
                if (res.data.success) {
                    let memberList = res.data.data.map(item => {
                        return {
                            label: item.name,
                            value: item.id,
                            content: item.phoneNumber,
                        }
                    })
                    this.setData({
                        memberList
                    })
                }
            })
        },

        async getGroups() {
            let params = {
                size: 999,
                page: 1
            }
            await http.post('/acGroup/getGroups', params).then(res => {
                if (res.data.success) {
                    let groupList = res.data.data.map(item => {
                        const len = Math.ceil(item.members.length / 2)
                        return {
                            label: item.name,
                            value: item.id,
                            content: '共' + len + '个成员',
                            members: item.members
                        }
                    })
                    this.setData({
                        groupList
                    })
                }
            })
        },

        async getMaterial() {
            let params = {
                size: 999,
                page: 1,
                state: 0
            }
            await http.post('/material/getMaterials', params).then(res => {
                if (res.data.success) {
                    let materialList = res.data.data.map(item => {
                        return {
                            label: item.name,
                            value: item.id,
                            content: item.standard,
                        }
                    })
                    this.setData({
                        materialList
                    })
                }
            })
        },

        jumpto() {
            const path = this.data.tab === '1' ? 'group' : 'member';
            wx.navigateTo({
                url: `/pages/${path}/index`,
            })
        },

        handleGroupChange(e) {
            const selected = e.detail.value
            this.setData({
                selected
            })
        },

        getSelected() {
            const selected = this.data.selected
            let res = []
            if (Array.isArray(selected)) {
                res = this.data.list.filter(item =>
                    selected.includes(item.value)
                )
            } else {
                res = this.data.list.filter(item =>
                    selected === item.value
                )
            }

            if (this.data.tab === '1') {
                let members = []
                res.forEach(item => {
                    const groupMember = item.members.split(',').map(item => Number(item))
                    members = [...members, ...groupMember]
                })
                res = this.data.memberList.filter(item =>
                    members.includes(item.value)
                )
            }
            return res
        },

        sumbit() {
            const selected = this.getSelected()
            const callback = this.data.callback
            this.triggerEvent('onSumbit', selected)

            // if (prevPage[callback]) {
            //     prevPage[callback](selected)
            // }
            this.onVisibleChange()
        },

        onTabsChange(e) {
            const {
                value,
                label
            } = e.detail
            const list = value === '1' ? this.data.groupList : this.data.memberList
            this.setData({
                tab: value,
                tabLabel: label,
                list,
                selected: []
            })
        },

        onVisibleChange() {
            const visible = !this.data.visible
            this.setData({
                visible: visible,
            });
        },
    },

    lifetimes: {
        attached: function () {
            this.getListbyFlag()
        }
    }
})