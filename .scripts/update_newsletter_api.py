import glob

html_files = glob.glob("*.html")

old_onsubmit = "onsubmit=\"event.preventDefault(); this.innerHTML = '<div style=\\'display:flex; align-items:center; gap:0.5rem; color:var(--clr-gold); font-size:1rem; font-family:var(--font-sans); margin-top:0.5rem;\\'><i class=\\'fa-solid fa-circle-check\\'></i> You are now subscribed!</div>';\""

# JavaScript to also call the backend endpoint
new_onsubmit = "onsubmit=\"event.preventDefault(); const form = this; const btn = form.querySelector('button'); btn.textContent = 'Wait...'; btn.disabled = true; fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email.value }) }).then(res => { if(res.ok) { form.innerHTML = '<div style=\\'display:flex; align-items:center; gap:0.5rem; color:var(--clr-gold); font-size:1rem; font-family:var(--font-sans); margin-top:0.5rem;\\'><i class=\\'fa-solid fa-circle-check\\'></i> You are now subscribed!</div>'; } else { throw new Error('Failed'); } }).catch(() => { btn.textContent = 'Subscribe'; btn.disabled = false; alert('Error: Unable to subscribe'); });\""

for f in html_files:
    with open(f, "r") as file:
        content = file.read()
    
    if old_onsubmit in content:
        content = content.replace(old_onsubmit, new_onsubmit)
        with open(f, "w") as file:
            file.write(content)
        print(f"Updated {f}")

print("Done")
