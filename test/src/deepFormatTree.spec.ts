/// <reference path="../../src/type/common.d.ts"/>
import { deepFormatTree } from '../../src/index'
import { describe, it } from 'mocha'
import { expect, assert } from 'chai'
describe('deepFormatTree', function () {
    describe('nomal', () => {
        it('simple output', () => {
            let group: data[] = [
                { a: 1, b: 0 },
                { a: 2, b: 0 },
                { a: 3, b: 0 },
                { a: 4, b: 0 },
                { a: 5, b: 0 },
                { a: 6, b: 0 },
            ]
            let struct: constructure = {
                x: 'b'
            }
            let res = deepFormatTree(group, struct)
            let shouldOutPut = {
                x: 0
            }
            expect(res).to.deep.equal(shouldOutPut)
        });
        it('output with function', () => {
            let group: data[] = [
                { a: 1, b: 2, c: 2 },
                { a: 1, b: 3, c: 2 },
                { a: 1, b: 4, c: 2 },
                { a: 1, b: 5, c: 2 },
                { a: 1, b: 6, c: 2 },
                { a: 1, b: 7, c: 2 },
            ]
            let struct: constructure = {
                x: (item: data) => item.a + item.c
            }
            let res = deepFormatTree(group, struct)
            let shouldOutPut = {
                x: 3
            }
            expect(res).to.deep.equal(shouldOutPut)
        });
        it('output by deep data', () => {
            let group: data[] = [
                { a: '1' },
                { a: '2' },
                { a: '3' },
                { a: '4' },
                { a: '5' },
                { a: '6' },
            ]
            let struct: constructure = {
                children: {
                    groupBy: [ 'a' ],
                    data: {
                        c: 'a'
                    }
                }
            }
            let shouldOutPut = {
                children: [
                    { c: '1' },
                    { c: '2' },
                    { c: '3' },
                    { c: '4' },
                    { c: '5' },
                    { c: '6' },
                ]
            }
            let res = deepFormatTree(group, struct)
            expect(res).to.deep.equal(shouldOutPut)
        });
        it('output with list', () => {
            let group: data[] = [
                { a: 1, b: 0 },
                { a: 2, b: 0 },
                { a: 3, b: 0 },
                { a: 4, b: 0 },
                { a: 5, b: 0 },
                { a: 6, b: 0 },
            ]
            let struct: constructure = {
                x: 'b'
            }
            let res = deepFormatTree(group, struct)
            let shouldOutPut = {
                x: 0
            }
            expect(res).to.deep.equal(shouldOutPut)
        });
    });
});

