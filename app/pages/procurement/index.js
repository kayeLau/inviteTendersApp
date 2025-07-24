import { http } from '../../server/api'
import { procurement } from '../../utils/config'

Page({
    data: {
        formMode: '',
        list: [],
        isEdit: false,
        procurement: procurement,
        selected: {
            label: '请选择'
        },
        description: ''
    },

    getProcurements() {
        let params = {
            size: 999,
            page: 1
        }
        http.post('/procurement/getProcurements', params).then(res => {
            if (res.data.success) {
                let list = res.data.data
                this.setData({
                    list
                })
            }
        })
    },

    sumbitProcurement() {
        if (this.data.formMode === 'create') {
            this.createProcurement()
        } else if (this.data.formMode === 'edit') {
            this.updateProcurement()
        }
    },

    createProcurement() {
        const data = this.selectComponent("#xl-form").getData()
        const materialId = this.data.selected.value
        if (!materialId) {
            this.setData({ description: '请选择材料' })
            return
        }
        if (!data) return;
        let params = {
            materialId,
            name: data.name,
            type: Number(data.type),
            price: Number(data.price),
            quantity: Number(data.quantity),
            remark: data.remark,
            recordImg: data.recordImg.length ? data.recordImg.path : '',
        }
        http.post('/procurement/createProcurement', params).then(res => {
            if (res.data.success) {
                this.getProcurements()
                this.setData({
                    isEdit: false
                })
            }
        })
    },

    updateProcurement() {
        let data = this.selectComponent("#xl-form").getData()
        if (!data) return;
        let params = {
            id: data.id,
            name: data.name,
            type: data.type,
            unit: data.unit,
            price: data.price,
            quantity: data.quantity,
            remark: data.remark,
            recordImg: data.recordImg.length ? data.recordImg.path : '',
        }
        http.post('/procurement/updateProcurement', params).then(res => {
            if (res.data.success) {
                this.getProcurements()
                this.setData({
                    isEdit: false
                })
            }
        })
    },

    async switchToEdit(e) {
        const formMode = e.currentTarget.dataset.mode
        this.setData({
            isEdit: true,
            formMode
        })
        const currentItem = e.currentTarget.dataset.current
        if (currentItem) {
            this.selectComponent("#xl-form").textData(currentItem)
        }
    },

    switchToList() {
        this.setData({
            isEdit: false,
        })
    },

    jumpto() {
        this.selectComponent('#select-penal').onVisibleChange()
    },

    jumptoPay(e) {
        const item = e.currentTarget.dataset.current
        const total = item.quantity * item.price
        wx.navigateTo({
            url: `/pages/procurementPay/index?id=${item.id}&total=${total}`
        })
    },

    jumptoPayRecord(e) {
        const item = e.currentTarget.dataset.current
        const total = item.quantity * item.price
        wx.navigateTo({
            url: `/pages/procurementRecord/index?id=${item.id}&total=${total}`
        })
    },

    onShow() {
        this.getProcurements()
    }
});