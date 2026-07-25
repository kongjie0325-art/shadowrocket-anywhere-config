#!/bin/bash
#!name=Auto Network Speed Test
#!desc=自动测速脚本 - 每10分钟测试一次
#!system=true
#!ignore-network-change=true

LOG="/tmp/network-test.log"

# IP 检测
IP=$(curl -s --max-time 5 https://api.ipify.org 2>/dev/null)
echo "[$(date '+%Y-%m-%d %H:%M:%S')] IP: ${IP:-未知}" >> $LOG

# DNS 解析测试
DOMAINS=("www.google.com" "www.baidu.com" "www.github.com")
for domain in "${DOMAINS[@]}"; do
    START=$(date +%s%N)
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 "https://${domain}" 2>/dev/null)
    END=$(date +%s%N)
    ELAPSED=$(( (END - START) / 1000000 ))
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] DNS(${domain}): ${ELAPSED}ms (HTTP ${STATUS:-timeout})" >> $LOG
done

# 延迟测试（generate_204）
START=$(date +%s%N)
STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://www.gstatic.com/generate_204 2>/dev/null)
END=$(date +%s%N)
ELAPSED=$(( (END - START) / 1000000 ))
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Latency: ${ELAPSED}ms (HTTP ${STATUS:-timeout})" >> $LOG

echo "---" >> $LOG
