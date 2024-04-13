from datetime import datetime
# Script is Unix-targeted so use "%-d" and not Windows-targeted "%#d"
dt = datetime.today().strftime('%B %-d, %Y')
with open('src/app/footer/update.ts', 'w') as f:
    f.write('const timestamp = "' + dt + '"; export default timestamp;')
