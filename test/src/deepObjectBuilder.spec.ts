/// <reference path="../../src/type/common.d.ts"/>
import { deepObjectBuilder } from '../../src/index'
import { describe, it } from 'mocha'
import { expect, assert } from 'chai'

describe('deepObjectBuilder', function () {
    describe('nomal', () => {
        it('one layer', function () {
            let item:data = {
                a: '1'
            }
            let struct = {
                b: 'a'
            }
            let shouldOutPut = {
                b: '1'
            }
            let res = deepObjectBuilder(item, struct)
            expect(res).to.deep.equal(shouldOutPut)
        })
        it('nested', function () {
            let item:data = {
                a: '1',
                b: '2',
                c: '3',
            }
            let struct = {
                x: 'a',
                x1: {
                    x2: 'b',
                    x3: 'c'
                }
            }
            let shouldOutPut = {
                x: '1',
                x1: {
                    x2: '2',
                    x3: '3'
                }
            }
            let res = deepObjectBuilder(item, struct)
            expect(res).to.deep.equal(shouldOutPut)
        })
    });
});
