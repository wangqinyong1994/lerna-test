// 主的流程控制
const apply = (action, ...args) => {
    //babel-env
    require(`./${action}`)(...args);
};

export default apply;