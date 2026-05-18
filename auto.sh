#防止各种github错误
git config --global core.autocrlf false
git config --global http.sslVerify false
# 更新package版本号（不自动commit）
npm version patch --no-git-tag-version
# 将更改提交
git add .
printf "您的commit的说明："
read commit
git commit -m "${commit}"
# 推送至github触发action
git push