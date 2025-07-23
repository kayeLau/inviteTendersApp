import {
    http
} from '../../server/api'
import {
    procurementPay
} from '../../utils/config'

Page({
    data: {
        formMode: null,
        procurementId: null,
        list: [],
        isEdit: false,
        procurementPay: procurementPay,
        total: 0,
        unPay: 0
    },

    getProcurements() {
        let params = {
            size: 999,
            page: 1,
            procurementId: this.data.procurementId
        }
        http.post('/procurementPay/getProcurementPays', params).then(res => {
            if (res.data.success) {
                let list = res.data.data
                this.setData({
                    list
                })
            }
        })
    },

    sumbitProcurement() {
        const formMode = this.data.formMode
        if (formMode === 'create') {
            this.createProcurement()
        } else if (formMode === 'edit') {
            this.updateProcurement()
        }
    },

    createProcurement() {
        const data = this.selectComponent("#xl-form").getData()
        const type = wx.getStorageSync('roleId')
        const procurementId = this.data.procurementId
        if (!data) return;
        let params = {
            procurementId,
            payDate: data.payDate,
            paid: data.paid,
            remark: data.remark,
            type,
            recordImg: data.recordImg.length ? data.recordImg.path : '',
        }
        http.post('/procurementPay/createProcurementPay', params).then(res => {
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
        const procurementId = this.data.procurementId
        if (!data) return;
        let params = {
            procurementId,
            id: data.id,
            payDate: data.payDate,
            paid: data.paid,
            remark: data.remark,
            recordImg: data.recordImg.length ? data.recordImg.path : '',
        }
        http.post('/procurementPay/updateProcurementPay', params).then(res => {
            if (res.data.success) {
                this.getProcurements()
                this.setData({
                    isEdit: false
                })
            }
        })
    },

    deleteProcurement(e) {
        const id = e.currentTarget.dataset.id
        if (!id) return;
        http.post('/procurementPay/deleteProcurementPay', {id}).then(res => {
            if (res.data.success) {
                this.getProcurements()
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

    onLoad(options) {
        this.setData({
            procurementId: Number(options.id),
            total: Number(options.total),
        })
        this.getProcurements()
    }
});