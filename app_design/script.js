const SCREENS = ['map','capture','missions','ranking','me'];
 
function setScreen(id){
  SCREENS.forEach(s=>{
    document.getElementById('screen-'+s).classList.toggle('active', s===id);
    const nb = document.getElementById('nav-'+s);
    if(nb) nb.classList.toggle('active', s===id);
  });
}
 
// Filter chips toggle
document.querySelectorAll('.filter-chip').forEach(chip=>{
  chip.addEventListener('click', function(){
    document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('on'));
    this.classList.add('on');
  });
});
 
// Mission tabs toggle
document.querySelectorAll('.m-tab').forEach(tab=>{
  tab.addEventListener('click', function(){
    document.querySelectorAll('.m-tab').forEach(t=>t.classList.remove('active'));
    this.classList.add('active');
  });
});
 
// AI species option toggle
document.querySelectorAll('.ai-species-opt').forEach(opt=>{
  opt.addEventListener('click', function(){
    document.querySelectorAll('.ai-species-opt').forEach(o=>o.classList.remove('selected'));
    this.classList.add('selected');
  });
});
