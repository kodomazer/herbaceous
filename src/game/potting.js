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
  }
  
}

function notCard(card){
  return function(val){return card.id !== val.id;}
}

export default potting
