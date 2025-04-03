const express = require('express');
const sql = require('mssql/msnodesqlv8');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=OPS-PF4PRB1Z;Database=pubs;Trusted_Connection=Yes;'
};


app.get('/authors', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM authors');
    res.json(result.recordset);
  } catch (err) {
    console.error('SQL Error:', err);
    res.status(500).json({ error: err.message });
  }
});


app.post('/authors', async (req, res) => {
  const { au_id, au_fname, au_lname, phone, city } = req.body;
  try {
    await sql.connect(config);
    const query = `
      INSERT INTO authors (au_id, au_fname, au_lname, phone, city, contract)
      VALUES (@au_id, @au_fname, @au_lname, @phone, @city, 0)
    `;
    const request = new sql.Request()
      .input('au_id', sql.VarChar, au_id)
      .input('au_fname', sql.VarChar, au_fname)
      .input('au_lname', sql.VarChar, au_lname)
      .input('phone', sql.VarChar, phone)
      .input('city', sql.VarChar, city);

    await request.query(query);
    res.status(201).json({ message: 'Author added' });
  } catch (err) {
    console.error('SQL Error:', err);
    res.status(500).json({ error: err.message });
  }
});


app.delete('/authors/:au_id', async (req, res) => {
  const { au_id } = req.params;
  try {
    await sql.connect(config);

    
    await new sql.Request()
      .input('au_id', sql.VarChar, au_id)
      .query('DELETE FROM titleauthor WHERE au_id = @au_id');

    
    const result = await new sql.Request()
      .input('au_id', sql.VarChar, au_id)
      .query('DELETE FROM authors WHERE au_id = @au_id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json({ message: 'Author deleted successfully' });
  } catch (err) {
    console.error('SQL Error (DELETE):', err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(3000, () => {
  console.log(' Server running at http://localhost:3000');
});
