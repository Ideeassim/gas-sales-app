# 📌 Git Daily Workflow Cheatsheet

## 🔑 Daily Commands

```bash
# 1. See what’s going on
git status

# 2. Stage all changes
git add .

# 3. Commit with a message
git commit -m "your update message"

# 4. Sync with GitHub (rebases instead of merging)
git pull

# 5. Push your work to GitHub
git push
```

---

## 🚀 Quick Summary
- **Save work** → `git add . && git commit -m "msg"`  
- **Sync first** → `git pull`  
- **Send to GitHub** → `git push`  

---

## ⚠️ If there’s a conflict

```bash
# Open files in VS Code, fix conflicts
git add .

# Continue the rebase
git rebase --continue
```

---

## 🛠 One-time Setup (already done if you followed earlier)

```bash
# Use VS Code as editor
git config --global core.editor "code --wait"

# Always rebase instead of merge
git config --global pull.rebase true

# Push to the current branch by default
git config --global push.default current
```
