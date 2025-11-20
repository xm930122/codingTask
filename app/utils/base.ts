/* eslint-disable @typescript-eslint/no-explicit-any */
// 考虑精度丢失问题，封装四则运算公共方法
import _ from 'lodash';

export function ToFloatFixed(num: number, pos = 2) {
    let s = '';
    if ((num || num === 0) && !isNaN(num)) {
        s = _.round(num, pos).toFixed(pos);
    }
    return s;
}

// 保留n位小数
export function ToPrecision(num: any, pos = 2) {
    if (isNaN(parseFloat(num))) {
        return false;
    }
    return ToFloatFixed(num, pos);
}

// 获取小数长度
const getDecimalsLength = (num: { toString: () => string; }) => (num.toString().split('.')[1] ? num.toString().split('.')[1].length : 0);

// 获取最大长度
const getMaxLength = (num1: any, num2: any) => {
    const num1Length = getDecimalsLength(num1);
    const num2Length = getDecimalsLength(num2);
    const p = Math.max(num1Length, num2Length);
    const times = Math.pow(10, p);
    return times;
}

// 乘法
export function mul(num1: { toString: () => string; }, num2: number) {
    const intNum1 = num1.toString().replace('.', '');
    const intNum2 = num2.toString().replace('.', '');
    const countDecimals = getDecimalsLength(num1) + getDecimalsLength(num2);
    return (parseInt(intNum1) * parseInt(intNum2)) / Math.pow(10, countDecimals);
}

// 除法
export function divide(num1: any, num2: any) {
    const times = getMaxLength(num1, num2);
    return (mul(num1, times) / mul(num2, times));
}