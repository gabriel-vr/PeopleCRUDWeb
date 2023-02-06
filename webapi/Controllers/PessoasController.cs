using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using Microsoft.EntityFrameworkCore;

namespace webapi.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase {

        private readonly Contexto _contexto;


        public PessoasController(Contexto contexto) {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> ObterPessoasAsync() {
            return await _contexto.Pessoas.ToListAsync();
        }

        [HttpGet("{pessoaId}")]
        public async Task<ActionResult<Pessoa>> ObterPessoaAsync(int pessoaId) {
            Pessoa pessoa =  await _contexto.Pessoas.FindAsync(pessoaId);
            if(pessoa == null)
                return NotFound();
            else
                return pessoa;
        }


        [HttpPost]
        public async Task<ActionResult<Pessoa>> CriarPessoa(Pessoa pessoa) {
            await _contexto.Pessoas.AddAsync(pessoa);
            await _contexto.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult<Pessoa>> AtualizarPessoa(Pessoa pessoa) {
            _contexto.Pessoas.Update(pessoa);
            await _contexto.SaveChangesAsync();
            return Ok();
        }


        [HttpDelete("{pessoaId}")]

        public async Task<ActionResult> ExcluirPessoa(int pessoaId) {
            Pessoa pessoa = await _contexto.Pessoas.FindAsync(pessoaId);
            if(pessoa == null) 
                return NotFound();
            _contexto.Remove(pessoa);
            await _contexto.SaveChangesAsync();

            return Ok();
        }
    }
}