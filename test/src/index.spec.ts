/// <reference path="../../src/type/common.d.ts"/>
import { formatTree } from '../../src/index'
import { describe, it } from 'mocha'
import { expect } from 'chai'
describe('formatTree', () => {
    describe('error params', () => {
        it('number', () => {
            // @ts-ignore
            expect(formatTree.bind(null, [ { a: 1 } ], { groupBy: 1 })).to.throw('[ParamsError] struct must be <null|undefined|0|string[]|string>,but find: ' + JSON.stringify(1));
        });
        it('Object', () => {
            // @ts-ignore
            expect(formatTree.bind(null, [ { a: 1 } ], { groupBy: { a: 1 } })).to.throw('[ParamsError] struct must be <null|undefined|0|string[]|string>,but find: ' + JSON.stringify({ "a": 1 }));
        })
    });
    describe('success type', () => {
        it('one layer, single groupby', () => {
            let group: data[] = [
                { a: '1', b: '7', c: '13', d: '19', e: '1' },
                { a: '2', b: '8', c: '14', d: '20', e: '1' },
                { a: '3', b: '9', c: '15', d: '21', e: '2' },
                { a: '4', b: '10', c: '16', d: '22', e: '2' },
                { a: '5', b: '11', c: '17', d: '23', e: '3' },
                { a: '6', b: '12', c: '18', d: '24', e: '3' },
            ]
            let struct: constructure = {
                groupBy: 'e',
                data: {
                    e: 'e',
                    children: {
                        a: 'a',
                        b: 'b',
                        c: 'c'
                    }
                }
            }
            let struct2: constructure = {
                groupBy: 'e',
                data: {
                    e: 'e',
                    children: {
                        data: {
                            a: 'a',
                            b: 'b',
                            c: 'c'
                        }
                    }
                }
            }
            let shouldOutPut = [
                {
                    e: '1',
                    children: [
                        { a: '1', b: '7', c: '13' },
                        { a: '2', b: '8', c: '14' }
                    ]
                },
                {
                    e: '2',
                    children: [
                        { a: '3', b: '9', c: '15' },
                        { a: '4', b: '10', c: '16' }
                    ]
                },
                {
                    e: '3',
                    children: [
                        { a: '5', b: '11', c: '17' },
                        { a: '6', b: '12', c: '18' }
                    ]
                }
            ]
            let res = formatTree(group, struct)
            let res2 = formatTree(group, struct2)
            // has data type
            expect(res).to.deep.equal(shouldOutPut)
            // no data type
            expect(res2).to.deep.equal(shouldOutPut)
        });

    });
});

