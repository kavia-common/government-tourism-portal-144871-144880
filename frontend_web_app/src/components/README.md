# UI Components (Ocean Professional)

This folder contains reusable UI primitives styled with Tailwind CSS:
- Button
- Input
- Card (with CardHeader, CardContent, CardFooter)
- Badge
- Modal
- Toast (ToastProvider, useToast)

Usage:
import Button from "../components/ui/Button";
<Button variant="primary" size="md">Click</Button>

Provide ToastProvider at app root (already wired in src/index.js) and use the hook:
import { useToast } from "../components/ui/Toast";
const { add } = useToast();
add("Saved successfully", "success");
