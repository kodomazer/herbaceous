import _ from 'lodash';

var potting = {
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
    if (array.length==0)
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
    }
    //If it isn't a valid pot, automatically fail
    return false;
  },
  
}

function notCard(card){
  return function(val){return card.id !== val.id;}
}

function validateLargePot(array){
  //All identical
  return false;
}
function validateWoodenPlanter(array){
  //All different
  return false;
}
function validateSmallPot(array){
  //Different pairs of identical
  return false;
}
function validateGlassJar(array){
  //any 3
  if(array.length<=3)
    return true;
  return false;
}

export default potting
