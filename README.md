# 🛡️ DriftGuard

### AI-powered code auditing agent grounded in real content from Sanity

AI can generate code in seconds, but sometimes that code is based on outdated APIs, old tutorials, or deprecated documentation.

**DriftGuard** is an AI-powered code auditing agent that checks code against structured coding rules stored in **Sanity**.

Instead of relying only on the model's existing knowledge, DriftGuard uses Sanity as a source of truth for identifying outdated APIs and recommending modern replacements.

---

## 🚀 What DriftGuard Does

You give DriftGuard a piece of code.

It:

1. 🔍 Analyzes the code
2. 📚 Retrieves relevant coding rules from Sanity
3. ⚠️ Identifies outdated or deprecated APIs
4. 💡 Explains the problem
5. 🔄 Suggests a recommended replacement

### Example

```text
Old API
   ↓
Sanity Code Rule
   ↓
DriftGuard
   ↓
Issue detected
   ↓
Explanation + recommended replacement
