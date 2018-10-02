import _ from 'lodash';

var Potting = {
  sanitize(array){
    let arr = _.filter(array,(obj)=>{
      if(obj.hasOwnProperty('id'))
        if(obj.hasOwnProperty('type'))
          return true;
      return false;
    });
    arr = _.sortBy(arr,['id']);
    return _.uniq(arr);
  },
  validate(array,privateGarden,publicGarden){
    if (array.length === 0)
      return false;
    let check = [...array];
    check =
      privateGarden.reduce(
      (acc,next)=>{
        return acc.filter(notCard(next));
      },
      check
    );
    check = publicGarden.reduce(
      (acc,next)=>{
        return acc.filter(notCard(next));
      },
      check
    );
    
    if(check.length === 0)
      return true;
    return false;
  },
  tryPot(array,pot){
    switch(pot){ //TODO: Use constants from a file instead of string literals
      case 'largePot':
        return validateLargePot(array);
      case 'woodenPlanter':
        return validateWoodenPlanter(array);
      case 'smallPots':
        return validateSmallPot(array);
      case 'glassJar':
        return validateGlassJar(array);
      default:
        //If it isn't a valid pot, automatically fail
        return false;
    }
  },
  
}

function notCard(card){
  return function(val)
    {
      return !(
        card.id === val.id &&
        card.type === val.type
        )
    }
}


function validateLargePot(array){
  var type = array[0].type
  var size = array.length
  for(var i = 0;i<size;i++){
    if(type !== array[i].type)
      return false;
  }
  return true;
}

function validateWoodenPlanter(array){
  var lastType = null
  var size = array.length
  for(var i = 0;i<size;i++){
    if(lastType === array[i].type)
      return false;
    lastType = array[i].type;
  }
  return true;
}

function validateSmallPot(array){
  if(array.length%2===1)return false;
  var lastType = null;
  var pairCount = array.length/2;
  for(let i = 0;i<pairCount;i++){
    if(array[i*2].type!==array[i*2+1].type)
      return false;
    if(lastType === array[i*2].type) return false;
    lastType = array[i*2].type;
  }
  return true;
}

function validateGlassJar(array){
  //any 3
  if(array.length<=3)
    return true;
  return false;
}

export default Potting
