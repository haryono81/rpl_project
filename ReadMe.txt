1. Buka 3 Terminals, Terminal=>New Terminal, di setiap terminal masuk ke masing-masing folder:
   - backend
   - frontend
   - shared-models

2. dimasing-masing terminal lakukan command berikut
    - npm install
    
3. di terminal shared-models
    - npm run build
    - npm link

4. di terminal backend
    - npm link shared-models
    - npm run start

5. di terminal frontend
    - npm link shared-models
    - npm run dev



====

Untuk unit test:
1. Buka terminal baru masuk ke frontend-test
    - npm install
    - npm run test


========================================

Bonus:
Command untuk delete node_modules secara cepat:
npx rimraf --glob **/node_modules 


