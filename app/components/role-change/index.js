Page({
  data:{
    role:[
      {
        name:'工人记账',
        id:1,
        icon:'../../assert/construction-worker.png'
      },
      {
        name:'带班记账',
        id:2,
        icon:'../../assert/engineer.png'
      },
      {
        name:'老板记账',
        id:3,
        icon:'../../assert/boss.png'
      }
    ]
  },
  changeRole(event){
    console.log(event)
    this.triggerEvent('changeRole', { 
      id: event.currentTarget.dataset.id,
      icon:event.currentTarget.dataset.icon
    });
  }
});