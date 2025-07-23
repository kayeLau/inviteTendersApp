Component({
    data: {
        visible: false
    },

    methods: {
        onConfirm() {
            this.triggerEvent('onConfirm')
        },

        onVisibleChange() {
            const visible = !this.data.visible
            this.setData({
                visible: visible,
            });
        },
    }
})