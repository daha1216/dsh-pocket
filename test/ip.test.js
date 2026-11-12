import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isValidIpv4 } from '../lib/ip.mjs'

// 为什么留这组断言：CLI 独立模式（bin/dsh-pocket.mjs）连同它的测试在 2026-11-12 删掉了，
// 但 isValidIpv4 还在两处活着——lib/web-rpc.js 的 lan.setOverride 与设置页的手动局域网地址输入。
// 它是「用户手输的 IP 会不会被当成局域网地址写进 settings.json、再印到二维码里」的唯一闸门，
// 边界值必须钉死。lib/ip.mjs 的注释写了三条由来：前导零按八进制解释、0/224+ 段不可展示、
// 跨段越界不是 IPv4。

test('isValidIpv4：可展示的局域网/公网点分十进制', () => {
  for (const value of ['192.168.1.20', '10.0.0.2', '172.16.31.254', '100.119.24.44', '8.8.8.8', '127.0.0.1', '169.254.1.1', '203.0.113.7']) {
    assert.equal(isValidIpv4(value), true, value + ' 应该被接受')
  }
})

test('isValidIpv4：通配/组播/保留/越界/前导零一律拒绝', () => {
  for (const value of [
    '0.0.0.0', '0.0.0.1',
    '224.0.0.1', '239.255.255.250', '240.0.0.1',
    '255.255.255.255',
    '010.0.0.1', '1.2.3.256',
    '1.2.3', '1.2.3.4.5', '1.2.3.-1',
    '::1', 'localhost', '',
    ' 1.2.3.4', '1.2.3.4 ', '1.2.3.4\n',
  ]) {
    assert.equal(isValidIpv4(value), false, JSON.stringify(value) + ' 应该被拒绝')
  }
})
